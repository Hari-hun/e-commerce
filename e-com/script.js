// Dashboard Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    updateCurrentDate();
    initializeCharts();
    setupNavigation();
    setupEventListeners();
}

// Update Current Date
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    const today = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = today;
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }
            
            // Update page title
            updatePageTitle(sectionId);
        });
    });
}

// Update Page Title
function updatePageTitle(sectionId) {
    const pageTitle = document.querySelector('.page-title');
    const titleMap = {
        'dashboard': 'Dashboard',
        'sales': 'Sales Management',
        'products': 'Product Management',
        'customers': 'Customer Management',
        'analytics': 'Analytics',
        'reports': 'Reports',
        'settings': 'Settings'
    };
    
    pageTitle.textContent = titleMap[sectionId] || 'Dashboard';
}

// Chart Configuration
let chartInstances = {};

function initializeCharts() {
    createRevenueChart();
    createCategoryChart();
    createSourceChart();
    createCustomerChart();
}

function createRevenueChart() {
    const revenueCtx = document.getElementById('revenue-chart');
    if (!revenueCtx) return;
    
    const revenueCtxContext = revenueCtx.getContext('2d');
    
    chartInstances.revenue = new Chart(revenueCtxContext, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Revenue (USD)',
                    data: [45000, 52000, 48000, 61000, 55000, 67000],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#3B82F6',
                    pointBorderColor: '#0F172A',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#0F172A',
                    pointHoverBorderColor: '#3B82F6',
                    pointHoverBorderWidth: 3,
                    hoverBorderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#CBD5E1',
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#F1F5F9',
                    bodyColor: '#CBD5E1',
                    borderColor: '#3B82F6',
                    borderWidth: 1,
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return 'Revenue: $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#CBD5E1',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    grid: {
                        color: 'rgba(51, 65, 85, 0.2)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#CBD5E1',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function createCategoryChart() {
    const categoryCtx = document.getElementById('category-chart');
    if (!categoryCtx) return;
    
    const categoryCtxContext = categoryCtx.getContext('2d');
    
    chartInstances.category = new Chart(categoryCtxContext, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors', 'Books'],
            datasets: [
                {
                    label: 'Sales Distribution',
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B',
                        '#EF4444',
                        '#8B5CF6'
                    ],
                    borderColor: '#1E293B',
                    borderWidth: 2,
                    hoverOffset: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#CBD5E1',
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#F1F5F9',
                    bodyColor: '#CBD5E1',
                    borderColor: '#3B82F6',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

function createSourceChart() {
    const sourceCtx = document.getElementById('source-chart');
    if (!sourceCtx) return;
    
    const sourceCtxContext = sourceCtx.getContext('2d');
    
    chartInstances.source = new Chart(sourceCtxContext, {
        type: 'bar',
        data: {
            labels: ['Direct', 'Organic Search', 'Paid Ads', 'Social Media', 'Referral'],
            datasets: [
                {
                    label: 'Number of Orders',
                    data: [450, 320, 580, 290, 180],
                    backgroundColor: '#3B82F6',
                    borderColor: '#1E40AF',
                    borderWidth: 1,
                    borderRadius: 8,
                    hoverBackgroundColor: '#60A5FA'
                }
            ]
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#CBD5E1',
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#F1F5F9',
                    bodyColor: '#CBD5E1',
                    borderColor: '#3B82F6',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return 'Orders: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#CBD5E1',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(51, 65, 85, 0.2)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#CBD5E1',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function createCustomerChart() {
    const customerCtx = document.getElementById('customer-chart');
    if (!customerCtx) return;
    
    const customerCtxContext = customerCtx.getContext('2d');
    
    chartInstances.customer = new Chart(customerCtxContext, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [
                {
                    label: 'New Customers',
                    data: [120, 145, 135, 165, 180],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#10B981',
                    pointBorderColor: '#0F172A',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#0F172A',
                    pointHoverBorderColor: '#10B981',
                    pointHoverBorderWidth: 3,
                    hoverBorderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#CBD5E1',
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#F1F5F9',
                    bodyColor: '#CBD5E1',
                    borderColor: '#10B981',
                    borderWidth: 1,
                    titleFont: {
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return 'Customers: ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#CBD5E1',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(51, 65, 85, 0.2)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#CBD5E1',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

// Event Listeners Setup
function setupEventListeners() {
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', handleDateRangeChange);
    }
}

// Handle Date Range Change
function handleDateRangeChange(event) {
    const selectedRange = event.target.value;
    updateDashboardData(selectedRange);
}

// Update Dashboard Data based on Date Range
function updateDashboardData(range) {
    console.log('Updating dashboard for range:', range, 'days');
    
    // This function would typically:
    // 1. Fetch data from the server based on the selected date range
    // 2. Update all metrics with new values
    // 3. Update all charts with new data
    
    // For now, we are using mock data
    // In production, replace with actual API calls
    
    const mockData = {
        '7': {
            revenue: 145230,
            orders: 523,
            conversion: 3.42,
            average: 277.50
        },
        '30': {
            revenue: 524890,
            orders: 2847,
            conversion: 3.24,
            average: 185.20
        },
        '90': {
            revenue: 1547230,
            orders: 8932,
            conversion: 3.18,
            average: 173.10
        },
        '365': {
            revenue: 5847900,
            orders: 31245,
            conversion: 3.05,
            average: 187.20
        }
    };
    
    const data = mockData[range];
    
    // Update metric values
    updateMetricValue('total-revenue', data.revenue);
    updateMetricValue('total-orders', data.orders);
    updateMetricValue('conversion-rate', data.conversion.toFixed(2));
    updateMetricValue('average-order', data.average.toFixed(2));
    
    // Show success message
    console.log('Dashboard updated successfully for last ' + range + ' days');
}

// Update Metric Value with Animation
function updateMetricValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const formattedValue = typeof value === 'number' 
        ? (value >= 1000 ? value.toLocaleString() : value.toFixed(2))
        : value;
    
    element.textContent = formattedValue;
    
    // Add animation effect
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'pulse 0.5s ease';
    }, 10);
}

// CSS Animation (add to style or here)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Format Currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

// Format Number
function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
}

// Export Data Function
function exportTableData(tableElement, filename) {
    let csv = '';
    const rows = tableElement.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        let csvRow = '';
        
        cols.forEach(col => {
            csvRow += '"' + col.textContent.trim() + '",';
        });
        
        csv += csvRow.slice(0, -1) + '\n';
    });
    
    downloadCSV(csv, filename);
}

// Download CSV
function downloadCSV(csv, filename) {
    const link = document.createElement('a');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Responsive Chart Adjustment
window.addEventListener('resize', debounce(() => {
    Object.keys(chartInstances).forEach(key => {
        if (chartInstances[key]) {
            chartInstances[key].resize();
        }
    });
}, 250));

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility Functions
function getFormattedDate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function calculatePercentageChange(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard initialized successfully');
});
