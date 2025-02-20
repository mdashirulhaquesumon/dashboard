// Get all the navbar items with the class 'has-dropdown'
const dropdowns = document.querySelectorAll('.navbar-item.has-dropdown');

dropdowns.forEach(dropdown => {
    // When the navbar item is clicked
    dropdown.addEventListener('click', function (e) {
        const dropdownMenu = dropdown.querySelector('.navbar-dropdown');
        
        // Toggle the dropdown menu visibility
        dropdownMenu.classList.toggle('is-active');
        
        // Prevent the click event from propagating (so it doesn't close the dropdown immediately)
        e.stopPropagation();
    });
});

// Close the dropdowns when clicking outside
document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.navbar-dropdown');
        dropdownMenu.classList.remove('is-active');
    });
});




// Toggle Dark/Light Mode
const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Toggle icon between moon and sun
    if (document.body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('bi-moon');
        modeIcon.classList.add('bi-sun');
    } else {
        modeIcon.classList.remove('bi-sun');
        modeIcon.classList.add('bi-moon');
    }
});

function toggleSidebar(id) {
    const sidebar = document.getElementById(id);
    const mainContent = document.getElementById('mainContent');
    const isMobile = window.innerWidth < 600;

    // Toggle active class for the sidebar
    sidebar.classList.toggle('active');

    // Adjust main content margin only on desktop
    if (!isMobile) {
        if (id === 'leftSidebar') {
            mainContent.classList.toggle("expanded-left");
        }
        if (id === 'rightSidebar') {
            mainContent.classList.toggle("expanded-right");
        }
    }
}

// Function to adjust layout on load and resize
function adjustLayout() {
    const mainContent = document.getElementById('mainContent');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    const isMobile = window.innerWidth < 600;

    if (isMobile) {
        // Hide both sidebars on mobile
        leftSidebar.classList.remove('active');
        rightSidebar.classList.remove('active');
        mainContent.classList.remove("expanded-left", "expanded-right");
    } else {
        // Show both sidebars and adjust margins on desktop
        leftSidebar.classList.add('active');
        rightSidebar.classList.add('active');
        mainContent.classList.add("expanded-left", "expanded-right");
    }
}

// Apply layout on page load
window.addEventListener('load', adjustLayout);

// Adjust layout on window resize
window.addEventListener('resize', adjustLayout);



 // Tabs Functionality
 const tabs = document.querySelectorAll('.tabs ul > li[data-tab]'); // Only select main tabs

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('is-active'));
    
    tab.classList.add('is-active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show target content
    const target = tab.getAttribute('data-tab');
    if (target) {
      document.getElementById(target).classList.add('active');
    }
  });
});



 document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-details');

    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const details = button.closest('.panel-block').nextElementSibling;
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
        button.querySelector('.icon i').classList.toggle('bi-caret-down-fill');
        button.querySelector('.icon i').classList.toggle('bi-caret-up-fill');
      });
    });
 });
  


 function toggleStorageMenu() {
    document.getElementById('storageMenu').classList.toggle('is-active');
}

function openContextMenu(event, connectionId) {
    event.stopPropagation();
    let menu = document.getElementById('contextMenu');

    menu.style.left = event.pageX + 'px';
    menu.style.top = event.pageY + 'px';
    menu.classList.add('is-active');

    menu.setAttribute('data-connection', connectionId);
}

function closeContextMenu() {
    document.getElementById('contextMenu').classList.remove('is-active');
}

function renameConnection() {
    let conn = document.getElementById('contextMenu').getAttribute('data-connection');
    alert('Rename ' + conn);
    closeContextMenu();
}

function deleteConnection() {
    let conn = document.getElementById('contextMenu').getAttribute('data-connection');
    alert('Delete ' + conn);
    closeContextMenu();
}

function openSettings() {
    let conn = document.getElementById('contextMenu').getAttribute('data-connection');
    alert('Open settings for ' + conn);
    closeContextMenu();
}

document.addEventListener('click', function (event) {
    let menu = document.getElementById('contextMenu');
    if (!menu.contains(event.target)) {
        closeContextMenu();
    }
});

document.addEventListener('click', function (event) {
    let dropdown = document.getElementById('storageMenu');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});

// Close error notification
document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
      });
    });
  });