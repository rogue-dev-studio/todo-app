// Todo List Application
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.currentView = 'list'; // 'list' or 'table'
        this.currentPage = 1;
        this.itemsPerPage = 10;
        
        this.initializeElements();
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    initializeElements() {
        // Input elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.charCount = document.getElementById('charCount');
        
        // List elements
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        
        // Table elements
        this.todoTableBody = document.getElementById('todoTableBody');
        this.tableEmptyState = document.getElementById('tableEmptyState');
        this.selectAllCheckbox = document.getElementById('selectAll');
        
        // View elements
        this.listView = document.getElementById('listView');
        this.tableView = document.getElementById('tableView');
        this.listViewBtn = document.getElementById('listViewBtn');
        this.tableViewBtn = document.getElementById('tableViewBtn');
        
        // Pagination elements
        this.itemsPerPageSelect = document.getElementById('itemsPerPage');
        this.paginationInfo = document.getElementById('paginationInfo');
        this.firstPageBtn = document.getElementById('firstPage');
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.lastPageBtn = document.getElementById('lastPage');
        this.pageNumbers = document.getElementById('pageNumbers');
        
        // Filter elements
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        
        // Action buttons
        this.exportExcelBtn = document.getElementById('exportExcel');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
        
        // Statistics elements
        this.statsToggle = document.getElementById('statsToggle');
        this.statisticsSidebar = document.getElementById('statisticsSidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.closeStats = document.getElementById('closeStats');
        this.exportStatsBtn = document.getElementById('exportStats');
        this.progressPercentage = document.getElementById('progressPercentage');
        this.progressFill = document.getElementById('progressFill');
        this.completedCount = document.getElementById('completedCount');
        this.activeCount = document.getElementById('activeCount');
        this.completedPercent = document.getElementById('completedPercent');
        this.activePercent = document.getElementById('activePercent');
        this.todayTasks = document.getElementById('todayTasks');
        this.todayCompleted = document.getElementById('todayCompleted');
        this.avgPerDay = document.getElementById('avgPerDay');
        this.productivityScore = document.getElementById('productivityScore');
        this.scoreDescription = document.getElementById('scoreDescription');
        
        // Chart
        this.pieChart = null;
        
        // Toast
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toastMessage');
    }

    bindEvents() {
        // Add todo
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        // Character count
        this.todoInput.addEventListener('input', () => this.updateCharCount());
        
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
        });
        
        // View toggle
        this.listViewBtn.addEventListener('click', () => this.setView('list'));
        this.tableViewBtn.addEventListener('click', () => this.setView('table'));
        
        // Items per page
        this.itemsPerPageSelect.addEventListener('change', () => {
            this.itemsPerPage = parseInt(this.itemsPerPageSelect.value);
            this.currentPage = 1;
            this.render();
        });
        
        // Pagination
        this.firstPageBtn.addEventListener('click', () => this.goToPage(1));
        this.prevPageBtn.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        this.nextPageBtn.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        this.lastPageBtn.addEventListener('click', () => this.goToPage(this.getTotalPages()));
        
        // Select all
        this.selectAllCheckbox.addEventListener('change', () => this.toggleSelectAll());
        
        // Action buttons
        this.exportExcelBtn.addEventListener('click', () => this.exportToExcel());
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        
        // Footer buttons
        document.getElementById('shareButton').addEventListener('click', () => this.shareApp());
        document.getElementById('exportButton').addEventListener('click', () => this.exportData());
        document.getElementById('importButton').addEventListener('click', () => this.importData());
        
        // Statistics
        this.statsToggle.addEventListener('click', () => this.toggleStatisticsSidebar());
        this.closeStats.addEventListener('click', () => this.closeStatisticsSidebar());
        this.sidebarOverlay.addEventListener('click', () => this.closeStatisticsSidebar());
        this.exportStatsBtn.addEventListener('click', () => this.exportStatistics());
        
                          // Keyboard shortcuts
         document.addEventListener('keydown', (e) => {
             // Close sidebar with Escape key
             if (e.key === 'Escape' && this.statisticsSidebar.classList.contains('open')) {
                 this.closeStatisticsSidebar();
                 return;
             }
             
             if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        this.todoInput.focus();
                        break;
                    case 'f':
                        e.preventDefault();
                        this.setFilter('all');
                        break;
                    case 'e':
                        e.preventDefault();
                        this.exportToExcel();
                        break;
                    case '1':
                        e.preventDefault();
                        this.setView('list');
                        break;
                                         case '2':
                         e.preventDefault();
                         this.setView('table');
                         break;
                     case 's':
                         e.preventDefault();
                         this.toggleStatisticsSidebar();
                         break;
                }
            }
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (!text) {
            this.showToast('Masukkan teks tugas terlebih dahulu!', 'warning');
            return;
        }
        
        if (text.length > 100) {
            this.showToast('Teks terlalu panjang! Maksimal 100 karakter.', 'error');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        this.updateStats();
        
        this.todoInput.value = '';
        this.updateCharCount();
        this.showToast('Tugas berhasil ditambahkan!', 'success');
        
        // Focus back to input
        setTimeout(() => this.todoInput.focus(), 100);
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
            this.updateStats();
            
            const message = todo.completed ? 'Tugas selesai!' : 'Tugas dibuka kembali!';
            this.showToast(message, 'success');
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;
        
        this.editingId = id;
        this.render();
        
        // Focus on edit input
        setTimeout(() => {
            const editInput = document.querySelector(`[data-edit-id="${id}"]`);
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }, 100);
    }

    saveEdit(id) {
        const editInput = document.querySelector(`[data-edit-id="${id}"]`);
        if (!editInput) return;
        
        const newText = editInput.value.trim();
        
        if (!newText) {
            this.showToast('Teks tidak boleh kosong!', 'warning');
            return;
        }
        
        if (newText.length > 100) {
            this.showToast('Teks terlalu panjang! Maksimal 100 karakter.', 'error');
            return;
        }
        
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.text = newText;
            this.saveTodos();
            this.render();
            this.updateStats();
            this.showToast('Tugas berhasil diperbarui!', 'success');
        }
        
        this.editingId = null;
    }

    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    deleteTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;
        
        // Add animation before removing
        const todoElement = document.querySelector(`[data-todo-id="${id}"]`);
        if (todoElement) {
            todoElement.style.transform = 'translateX(-100%)';
            todoElement.style.opacity = '0';
            
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
                this.updateStats();
                this.showToast('Tugas berhasil dihapus!', 'success');
            }, 300);
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showToast('Tidak ada tugas yang selesai!', 'info');
            return;
        }
        
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.render();
        this.updateStats();
        this.showToast(`${completedCount} tugas selesai berhasil dihapus!`, 'success');
    }

    clearAll() {
        if (this.todos.length === 0) {
            this.showToast('Tidak ada tugas untuk dihapus!', 'info');
            return;
        }
        
        if (confirm('Apakah Anda yakin ingin menghapus semua tugas?')) {
            const count = this.todos.length;
            this.todos = [];
            this.saveTodos();
            this.render();
            this.updateStats();
            this.showToast(`${count} tugas berhasil dihapus!`, 'success');
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Update active filter button
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }

    setView(view) {
        this.currentView = view;
        
        // Update active view button
        this.listViewBtn.classList.toggle('active', view === 'list');
        this.tableViewBtn.classList.toggle('active', view === 'table');
        
        // Show/hide views
        this.listView.style.display = view === 'list' ? 'block' : 'none';
        this.tableView.style.display = view === 'table' ? 'block' : 'none';
        
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    getPaginatedTodos() {
        const filteredTodos = this.getFilteredTodos();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return filteredTodos.slice(startIndex, endIndex);
    }

    getTotalPages() {
        const filteredTodos = this.getFilteredTodos();
        return Math.ceil(filteredTodos.length / this.itemsPerPage);
    }

    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
        }
    }

    toggleSelectAll() {
        const isChecked = this.selectAllCheckbox.checked;
        const checkboxes = document.querySelectorAll('.table-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        const paginatedTodos = this.getPaginatedTodos();
        
        if (this.currentView === 'list') {
            this.renderListView(paginatedTodos, filteredTodos.length);
        } else {
            this.renderTableView(paginatedTodos, filteredTodos.length);
        }
        
        this.renderPagination(filteredTodos.length);
        this.updateStatistics();
    }

    renderListView(todos, totalCount) {
        if (todos.length === 0) {
            this.todoList.style.display = 'none';
            this.emptyState.classList.add('show');
        } else {
            this.todoList.style.display = 'block';
            this.emptyState.classList.remove('show');
            
            this.todoList.innerHTML = todos.map(todo => this.createTodoHTML(todo)).join('');
            this.bindTodoEvents();
        }
    }

    renderTableView(todos, totalCount) {
        if (todos.length === 0) {
            this.todoTableBody.innerHTML = '';
            this.tableEmptyState.style.display = 'block';
        } else {
            this.tableEmptyState.style.display = 'none';
            
            this.todoTableBody.innerHTML = todos.map((todo, index) => {
                const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index + 1;
                return this.createTableRowHTML(todo, globalIndex);
            }).join('');
            
            this.bindTableEvents();
        }
    }

    renderPagination(totalCount) {
        const totalPages = this.getTotalPages();
        
        // Update pagination info
        const startItem = totalCount === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalCount);
        this.paginationInfo.textContent = `Menampilkan ${startItem} sampai ${endItem} dari ${totalCount} item`;
        
        // Update pagination buttons
        this.firstPageBtn.disabled = this.currentPage === 1;
        this.prevPageBtn.disabled = this.currentPage === 1;
        this.nextPageBtn.disabled = this.currentPage === totalPages;
        this.lastPageBtn.disabled = this.currentPage === totalPages;
        
        // Update page numbers
        this.renderPageNumbers(totalPages);
    }

    renderPageNumbers(totalPages) {
        if (totalPages <= 1) {
            this.pageNumbers.innerHTML = '';
            return;
        }
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        let pageNumbersHTML = '';
        
        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === this.currentPage;
            pageNumbersHTML += `
                <button class="page-number ${isActive ? 'active' : ''}" onclick="todoApp.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        this.pageNumbers.innerHTML = pageNumbersHTML;
    }

    createTodoHTML(todo) {
        const isEditing = this.editingId === todo.id;
        const editClass = isEditing ? 'editing' : '';
        const completedClass = todo.completed ? 'completed' : '';
        
        if (isEditing) {
            return `
                <li class="todo-item ${editClass}" data-todo-id="${todo.id}">
                    <div class="todo-edit-container">
                        <input 
                            type="text" 
                            class="todo-edit-input" 
                            value="${todo.text}"
                            data-edit-id="${todo.id}"
                            maxlength="100"
                        >
                        <div class="edit-actions">
                            <button class="todo-btn save-btn" onclick="todoApp.saveEdit(${todo.id})">
                                <span>💾</span>
                            </button>
                            <button class="todo-btn cancel-btn" onclick="todoApp.cancelEdit()">
                                <span>❌</span>
                            </button>
                        </div>
                    </div>
                </li>
            `;
        }
        
        return `
            <li class="todo-item ${completedClass}" data-todo-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoApp.toggleTodo(${todo.id})"></div>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="todo-btn edit" onclick="todoApp.editTodo(${todo.id})" title="Edit">
                        <span>✏️</span>
                    </button>
                    <button class="todo-btn delete" onclick="todoApp.deleteTodo(${todo.id})" title="Hapus">
                        <span>🗑️</span>
                    </button>
                </div>
            </li>
        `;
    }

    createTableRowHTML(todo, index) {
        const completedClass = todo.completed ? 'completed' : '';
        const statusText = todo.completed ? 'Selesai' : 'Aktif';
        const statusClass = todo.completed ? 'completed' : 'active';
        const dateText = new Date(todo.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <tr class="${completedClass}" data-todo-id="${todo.id}">
                <td class="td-checkbox">
                    <input type="checkbox" class="table-checkbox" ${todo.completed ? 'checked' : ''} onchange="todoApp.toggleTodo(${todo.id})">
                </td>
                <td class="td-number">${index}</td>
                <td class="td-task">
                    <span class="task-text">${this.escapeHtml(todo.text)}</span>
                </td>
                <td class="td-status">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td class="td-date">
                    <span class="date-text">${dateText}</span>
                </td>
                <td class="td-actions">
                    <div class="table-actions">
                        <button class="table-btn edit" onclick="todoApp.editTodo(${todo.id})" title="Edit">
                            <span>✏️</span>
                        </button>
                        <button class="table-btn delete" onclick="todoApp.deleteTodo(${todo.id})" title="Hapus">
                            <span>🗑️</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    bindTodoEvents() {
        // Bind edit input events
        const editInputs = document.querySelectorAll('.todo-edit-input');
        editInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const id = parseInt(input.dataset.editId);
                    this.saveEdit(id);
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.cancelEdit();
                }
            });
        });
    }

    bindTableEvents() {
        // Bind table checkbox events
        const tableCheckboxes = document.querySelectorAll('.table-checkbox');
        tableCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const todoId = parseInt(e.target.closest('tr').dataset.todoId);
                this.toggleTodo(todoId);
            });
        });
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        
        this.totalTasks.textContent = total;
        this.completedTasks.textContent = completed;
    }

    updateCharCount() {
        const count = this.todoInput.value.length;
        this.charCount.textContent = `${count}/100`;
        
        // Change color based on count
        if (count > 90) {
            this.charCount.style.color = '#ef4444';
        } else if (count > 70) {
            this.charCount.style.color = '#f59e0b';
        } else {
            this.charCount.style.color = '#94a3b8';
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    showToast(message, type = 'info') {
        this.toastMessage.textContent = message;
        this.toast.className = `toast show toast-${type}`;
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export todos to Excel
    exportToExcel() {
        // Get filtered todos based on current filter
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.showToast('Tidak ada data untuk diekspor!', 'warning');
            return;
        }

        try {
            // Prepare data for Excel
            const excelData = filteredTodos.map((todo, index) => ({
                'No': index + 1,
                'Tugas': todo.text,
                'Status': todo.completed ? 'Selesai' : 'Belum Selesai',
                'Tanggal Dibuat': new Date(todo.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                'ID': todo.id
            }));

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);

            // Set column widths
            const colWidths = [
                { wch: 5 },   // No
                { wch: 50 },  // Tugas
                { wch: 15 },  // Status
                { wch: 25 },  // Tanggal Dibuat
                { wch: 15 }   // ID
            ];
            ws['!cols'] = colWidths;

            // Add worksheet to workbook
            const filterName = this.getFilterDisplayName();
            XLSX.utils.book_append_sheet(wb, ws, `Todo List - ${filterName}`);

            // Generate filename with current date and filter
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
            const filterStr = this.currentFilter === 'all' ? 'Semua' : 
                             this.currentFilter === 'active' ? 'Aktif' : 'Selesai';
            const filename = `TodoList_${filterStr}_${dateStr}_${timeStr}.xlsx`;

            // Save file
            XLSX.writeFile(wb, filename);

            this.showToast(`Data ${filterName} berhasil diekspor ke ${filename}!`, 'success');

        } catch (error) {
            console.error('Error exporting to Excel:', error);
            this.showToast('Error: Gagal mengekspor data!', 'error');
        }
    }

    // Helper method to get filter display name
    getFilterDisplayName() {
        switch (this.currentFilter) {
            case 'active':
                return 'Aktif';
            case 'completed':
                return 'Selesai';
            default:
                return 'Semua';
        }
    }

    // Update statistics
    updateStatistics() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        
        // Progress bar
        const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
        this.progressPercentage.textContent = `${progressPercent}%`;
        this.progressFill.style.width = `${progressPercent}%`;
        
        // Counts
        this.completedCount.textContent = completed;
        this.activeCount.textContent = active;
        
        // Percentages
        const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
        const activePercent = total > 0 ? Math.round((active / total) * 100) : 0;
        this.completedPercent.textContent = `${completedPercent}%`;
        this.activePercent.textContent = `${activePercent}%`;
        
        // Daily stats
        this.updateDailyStats();
        
        // Productivity score
        this.updateProductivityScore(completed, total);
        
        // Update pie chart
        this.updatePieChart(completed, active);
    }

    // Update daily statistics
    updateDailyStats() {
        const today = new Date().toDateString();
        const todayTasks = this.todos.filter(t => 
            new Date(t.createdAt).toDateString() === today
        ).length;
        
        const todayCompleted = this.todos.filter(t => 
            t.completed && new Date(t.createdAt).toDateString() === today
        ).length;
        
        // Calculate average per day
        const dates = [...new Set(this.todos.map(t => 
            new Date(t.createdAt).toDateString()
        ))];
        const avgPerDay = dates.length > 0 ? Math.round(this.todos.length / dates.length) : 0;
        
        this.todayTasks.textContent = todayTasks;
        this.todayCompleted.textContent = todayCompleted;
        this.avgPerDay.textContent = avgPerDay;
    }

    // Update productivity score
    updateProductivityScore(completed, total) {
        let score = 0;
        let description = '';
        
        if (total === 0) {
            description = 'Mulai tambahkan tugas untuk melihat skor produktivitas Anda!';
        } else {
            const completionRate = (completed / total) * 100;
            
            if (completionRate >= 80) {
                score = 100;
                description = 'Excellent! Anda sangat produktif! 🎉';
            } else if (completionRate >= 60) {
                score = 80;
                description = 'Bagus! Anda cukup produktif! 👍';
            } else if (completionRate >= 40) {
                score = 60;
                description = 'Cukup baik, bisa ditingkatkan lagi! 💪';
            } else if (completionRate >= 20) {
                score = 40;
                description = 'Perlu lebih banyak usaha! 🔥';
            } else {
                score = 20;
                description = 'Mulai dari yang kecil, step by step! 🌱';
            }
        }
        
        this.productivityScore.textContent = score;
        this.scoreDescription.textContent = description;
        
        // Update circle progress
        const circle = document.querySelector('.score-circle');
        if (circle) {
            circle.style.background = `conic-gradient(var(--success-color) 0deg, var(--success-color) ${score * 3.6}deg, var(--border-light) ${score * 3.6}deg)`;
        }
    }

    // Update pie chart
    updatePieChart(completed, active) {
        const ctx = document.getElementById('pieChart');
        if (!ctx) return;
        
        // Remove any existing fallback
        const existingFallback = ctx.parentNode.querySelector('.chart-fallback');
        if (existingFallback) {
            existingFallback.remove();
        }
        
        // Reset canvas display
        ctx.style.display = 'block';
        
        try {
            // Destroy existing chart
            if (this.pieChart) {
                this.pieChart.destroy();
            }
            
            // Set canvas size explicitly
            ctx.width = 150;
            ctx.height = 150;
            
            // Create new chart with smaller size and better error handling
            this.pieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Selesai', 'Aktif'],
                    datasets: [{
                        data: [completed, active],
                        backgroundColor: [
                            '#4ECDC4', // Success color
                            '#FFE66D'  // Warning color
                        ],
                        borderWidth: 0,
                        cutout: '60%'
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? Math.round((context.parsed / total) * 100) : 0;
                                    return `${context.label}: ${context.parsed} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating pie chart:', error);
            // Fallback: show text instead of chart
            ctx.style.display = 'none';
            const fallbackText = document.createElement('div');
            fallbackText.className = 'chart-fallback';
            fallbackText.innerHTML = `
                <div class="fallback-stats">
                    <div class="fallback-item">
                        <span class="fallback-label">Selesai: ${completed}</span>
                    </div>
                    <div class="fallback-item">
                        <span class="fallback-label">Aktif: ${active}</span>
                    </div>
                </div>
            `;
            ctx.parentNode.appendChild(fallbackText);
        }
    }

    // Toggle statistics sidebar
    toggleStatisticsSidebar() {
        this.statisticsSidebar.classList.add('open');
        this.sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.showToast('Statistik dibuka!', 'info');
    }

    // Close statistics sidebar
    closeStatisticsSidebar() {
        this.statisticsSidebar.classList.remove('open');
        this.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Export statistics to Excel
    exportStatistics() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const today = new Date().toDateString();
        const todayTasks = this.todos.filter(t => 
            new Date(t.createdAt).toDateString() === today
        ).length;
        
        const todayCompleted = this.todos.filter(t => 
            t.completed && new Date(t.createdAt).toDateString() === today
        ).length;
        
        const dates = [...new Set(this.todos.map(t => 
            new Date(t.createdAt).toDateString()
        ))];
        const avgPerDay = dates.length > 0 ? Math.round(this.todos.length / dates.length) : 0;
        
        try {
                // Prepare chart data for Excel
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const active = total - completed;
            
            // Create workbook
            const wb = XLSX.utils.book_new();
            
            // Statistics summary
            const statsData = [
                { 'Metrik': 'Total Tugas', 'Nilai': total },
                { 'Metrik': 'Tugas Selesai', 'Nilai': completed },
                { 'Metrik': 'Tugas Aktif', 'Nilai': active },
                { 'Metrik': 'Progress (%)', 'Nilai': `${progressPercent}%` },
                { 'Metrik': 'Tugas Hari Ini', 'Nilai': todayTasks },
                { 'Metrik': 'Selesai Hari Ini', 'Nilai': todayCompleted },
                { 'Metrik': 'Rata-rata per Hari', 'Nilai': avgPerDay },
                { 'Metrik': 'Tanggal Export', 'Nilai': new Date().toLocaleDateString('id-ID') }
            ];
            
            const ws1 = XLSX.utils.json_to_sheet(statsData);
            ws1['!cols'] = [{ wch: 20 }, { wch: 15 }];
            XLSX.utils.book_append_sheet(wb, ws1, 'Statistik');
            
            // Chart data sheet
            const chartData = [
                { 'Kategori': 'Selesai', 'Jumlah': completed, 'Persentase': total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%' },
                { 'Kategori': 'Aktif', 'Jumlah': active, 'Persentase': total > 0 ? `${Math.round((active / total) * 100)}%` : '0%' }
            ];
            
            const ws3 = XLSX.utils.json_to_sheet(chartData);
            ws3['!cols'] = [{ wch: 15 }, { wch: 10 }, { wch: 15 }];
            XLSX.utils.book_append_sheet(wb, ws3, 'Data Chart');
            
            // Detailed data
            const detailedData = this.todos.map((todo, index) => ({
                'No': index + 1,
                'Tugas': todo.text,
                'Status': todo.completed ? 'Selesai' : 'Aktif',
                'Tanggal Dibuat': new Date(todo.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                'ID': todo.id
            }));
            
            const ws2 = XLSX.utils.json_to_sheet(detailedData);
            ws2['!cols'] = [
                { wch: 5 },   // No
                { wch: 50 },  // Tugas
                { wch: 15 },  // Status
                { wch: 25 },  // Tanggal Dibuat
                { wch: 15 }   // ID
            ];
            XLSX.utils.book_append_sheet(wb, ws2, 'Data Detail');
            
            // Add chart image if available
            this.addChartToExcel(wb, completed, active);
            
            // Generate filename
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
            const filename = `Statistik_TodoList_${dateStr}_${timeStr}.xlsx`;
            
            // Save file
            XLSX.writeFile(wb, filename);
            
            this.showToast(`Statistik dan diagram berhasil diekspor ke ${filename}!`, 'success');
            
        } catch (error) {
            console.error('Error exporting statistics:', error);
            this.showToast('Error: Gagal mengekspor statistik!', 'error');
        }
    }



    // Add Excel chart with proper chart object
    addChartToExcel(wb, completed, active) {
        try {
            const total = completed + active;
            
            // Create chart data worksheet
            const chartData = [
                ['Kategori', 'Jumlah'],
                ['Selesai', completed],
                ['Aktif', active]
            ];
            
            const ws = XLSX.utils.aoa_to_sheet(chartData);
            ws['!cols'] = [{ wch: 15 }, { wch: 10 }];
            
            // Add chart data worksheet
            XLSX.utils.book_append_sheet(wb, ws, 'Chart Data');
            
            // Try to create actual Excel chart if library is available
            if (typeof XLSXCharts !== 'undefined') {
                try {
                    // Create chart object
                    const chart = {
                        type: 'pie',
                        title: 'Diagram Distribusi Status Tugas',
                        series: [{
                            name: 'Status Tugas',
                            data: [
                                { name: 'Selesai', value: completed },
                                { name: 'Aktif', value: active }
                            ]
                        }]
                    };
                    
                    // Add chart to worksheet
                    if (!ws['!charts']) ws['!charts'] = [];
                    ws['!charts'].push(chart);
                    
                    console.log('Excel chart object added successfully');
                } catch (chartError) {
                    console.log('Chart library not working, using fallback:', chartError);
                }
            }
            
            // Create chart worksheet with instructions
            const chartWs = XLSX.utils.aoa_to_sheet([
                ['Diagram Distribusi Status Tugas'],
                [''],
                ['Keterangan:'],
                ['• Selesai: ' + completed + ' tugas'],
                ['• Aktif: ' + active + ' tugas'],
                [''],
                ['Cara membuat chart Excel:'],
                ['1. Buka sheet "Chart Data"'],
                ['2. Pilih data A1:B3'],
                ['3. Klik Insert > Charts > Pie Chart'],
                ['4. Atau gunakan shortcut Alt + F1'],
                [''],
                ['Data untuk chart:'],
                ['Kategori', 'Jumlah'],
                ['Selesai', completed],
                ['Aktif', active]
            ]);
            
            chartWs['!cols'] = [{ wch: 40 }];
            XLSX.utils.book_append_sheet(wb, chartWs, 'Diagram Excel - Instruksi');
            
            // Create a worksheet with chart-ready data
            const chartReadyData = [
                ['Status Tugas', 'Jumlah', 'Persentase'],
                ['Selesai', completed, total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%'],
                ['Aktif', active, total > 0 ? `${Math.round((active / total) * 100)}%` : '0%'],
                ['Total', total, '100%']
            ];
            
            const chartReadyWs = XLSX.utils.aoa_to_sheet(chartReadyData);
            chartReadyWs['!cols'] = [{ wch: 15 }, { wch: 10 }, { wch: 15 }];
            XLSX.utils.book_append_sheet(wb, chartReadyWs, 'Data Chart Siap');
            
            // Also create text-based representation as backup
            this.createChartTextSheet(wb, completed, active);
            
        } catch (error) {
            console.error('Error adding Excel chart:', error);
            // Fallback to text version
            this.createChartTextSheet(wb, completed, active);
        }
    }



    // Create text-based chart sheet
    createChartTextSheet(wb, completed, active) {
        const total = completed + active;
        const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
        const activePercent = total > 0 ? Math.round((active / total) * 100) : 0;
        
        const chartData = [
            ['Diagram Distribusi Status Tugas'],
            [''],
            ['Kategori', 'Jumlah', 'Persentase', 'Visual Bar'],
            ['Selesai', completed, `${completedPercent}%`, '█'.repeat(Math.max(1, Math.round(completedPercent / 5)))],
            ['Aktif', active, `${activePercent}%`, '█'.repeat(Math.max(1, Math.round(activePercent / 5)))],
            ['Total', total, '100%', ''],
            [''],
            ['Keterangan:'],
            [`• Total tugas: ${total}`],
            [`• Tugas selesai: ${completed} (${completedPercent}%)`],
            [`• Tugas aktif: ${active} (${activePercent}%)`],
            [''],
            ['Visual Bar menunjukkan proporsi relatif']
        ];
        
        const ws = XLSX.utils.aoa_to_sheet(chartData);
        ws['!cols'] = [
            { wch: 15 },  // Kategori
            { wch: 10 },  // Jumlah
            { wch: 15 },  // Persentase
            { wch: 30 }   // Visual Bar
        ];
        
        XLSX.utils.book_append_sheet(wb, ws, 'Diagram');
    }



    // Export todos to JSON (existing method)
    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showToast('Data berhasil diekspor!', 'success');
    }

    // Import todos from JSON (existing method)
    importTodos(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTodos = JSON.parse(e.target.result);
                if (Array.isArray(importedTodos)) {
                    this.todos = importedTodos;
                    this.saveTodos();
                    this.render();
                    this.updateStats();
                    this.showToast(`${importedTodos.length} tugas berhasil diimpor!`, 'success');
                } else {
                    throw new Error('Format file tidak valid');
                }
            } catch (error) {
                this.showToast('Error: File tidak valid!', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Share app functionality
    shareApp() {
        if (navigator.share) {
            navigator.share({
                title: 'Todo List App',
                text: 'Aplikasi Todo List sederhana dan modern untuk mengelola tugas harian',
                url: window.location.href
            }).then(() => {
                this.showToast('Aplikasi berhasil dibagikan!', 'success');
            }).catch((error) => {
                console.log('Error sharing:', error);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        const text = 'Todo List App - Aplikasi sederhana untuk mengelola tugas harian';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                this.showToast('Link berhasil disalin ke clipboard!', 'success');
            }).catch(() => {
                this.showToast('Gagal menyalin link', 'error');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = `${text}\n${url}`;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showToast('Link berhasil disalin ke clipboard!', 'success');
            } catch (err) {
                this.showToast('Gagal menyalin link', 'error');
            }
            document.body.removeChild(textArea);
        }
    }

    // Export data functionality
    exportData() {
        const data = {
            todos: this.todos,
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todo-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Data berhasil diekspor!', 'success');
    }

    // Import data functionality
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    if (data.todos && Array.isArray(data.todos)) {
                        // Merge with existing todos or replace
                        const shouldReplace = confirm('Apakah Anda ingin mengganti semua data yang ada? Klik "OK" untuk mengganti, "Cancel" untuk menambahkan.');
                        
                        if (shouldReplace) {
                            this.todos = data.todos;
                        } else {
                            // Merge data, avoid duplicates
                            const existingIds = new Set(this.todos.map(todo => todo.id));
                            const newTodos = data.todos.filter(todo => !existingIds.has(todo.id));
                            this.todos = [...this.todos, ...newTodos];
                        }
                        
                        this.saveTodos();
                        this.render();
                        this.updateStats();
                        this.showToast(`Berhasil mengimpor ${data.todos.length} tugas!`, 'success');
                    } else {
                        this.showToast('Format file tidak valid!', 'error');
                    }
                } catch (error) {
                    this.showToast('Error: File tidak valid!', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
}

// Initialize app when DOM is loaded
let todoApp;
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
    
    // Add some sample todos for demo
    if (todoApp.todos.length === 0) {
        const sampleTodos = [
            { id: 1, text: 'Selamat datang di Todo List App!', completed: false, createdAt: new Date().toISOString() },
            { id: 2, text: 'Klik checkbox untuk menandai selesai', completed: true, createdAt: new Date().toISOString() },
            { id: 3, text: 'Gunakan tombol edit untuk mengubah tugas', completed: false, createdAt: new Date().toISOString() },
            { id: 4, text: 'Filter tugas berdasarkan status', completed: false, createdAt: new Date().toISOString() },
            { id: 5, text: 'Export ke Excel dengan tombol 📊', completed: false, createdAt: new Date().toISOString() },
            { id: 6, text: 'Gunakan tabel view untuk tampilan yang lebih terorganisir', completed: false, createdAt: new Date().toISOString() },
            { id: 7, text: 'Atur jumlah item per halaman dengan dropdown', completed: false, createdAt: new Date().toISOString() },
            { id: 8, text: 'Navigasi antar halaman dengan pagination', completed: false, createdAt: new Date().toISOString() },
            { id: 9, text: 'Keyboard shortcut: Ctrl+1 untuk list view', completed: false, createdAt: new Date().toISOString() },
            { id: 10, text: 'Keyboard shortcut: Ctrl+2 untuk table view', completed: false, createdAt: new Date().toISOString() },
            { id: 11, text: 'Tampilan responsive untuk mobile dan desktop', completed: false, createdAt: new Date().toISOString() },
            { id: 12, text: 'Data tersimpan otomatis di local storage', completed: false, createdAt: new Date().toISOString() }
        ];
        todoApp.todos = sampleTodos;
        todoApp.saveTodos();
        todoApp.render();
        todoApp.updateStats();
    }
});

// Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add CSS for edit mode
const style = document.createElement('style');
style.textContent = `
    .todo-edit-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
    }
    
    .todo-edit-input {
        flex: 1;
        padding: 0.5rem;
        border: 2px solid var(--primary-color);
        border-radius: var(--radius-sm);
        font-size: 1rem;
        outline: none;
    }
    
    .edit-actions {
        display: flex;
        gap: 0.25rem;
    }
    
    .save-btn:hover {
        color: var(--success-color) !important;
    }
    
    .cancel-btn:hover {
        color: var(--danger-color) !important;
    }
    
    .toast-success {
        background: var(--success-color);
    }
    
    .toast-error {
        background: var(--danger-color);
    }
    
    .toast-warning {
        background: var(--warning-color);
    }
    
    .toast-info {
        background: var(--text-secondary);
    }
`;
document.head.appendChild(style);
