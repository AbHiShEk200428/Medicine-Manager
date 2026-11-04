
$(document).ready(function(){
  const zones = {
    daily: {
      parentButton: "#ParentTab1",
      container: "#Daily_Elements",
      defaultTab: "#Dashboardtab_Btn"
    },
    inventory: {
      parentButton: "#ParentTab2",
      container: "#Inventory_Elements",
      defaultTab: "#Inventorytab_Btn"
    },
    occasional: {
      parentButton: "#ParentTab3",
      container: "#Occasional_Elements",
      defaultTab: "#MedIssuestab_Btn"
    }
  };
  let activeZone = "daily";

  $("#Inventory_Elements, #Occasional_Elements").hide();

  function getZoneElements(zoneName) {
    const zone = zones[zoneName];
    const container = document.querySelector(zone.container);
    const defaultTab = document.querySelector(zone.defaultTab);

    if (!container || !defaultTab || !container.contains(defaultTab)) {
      console.error(`Cannot switch to the ${zoneName} zone: its container or default tab is missing.`);
      return null;
    }

    return { container, defaultTab };
  }

  function clearZoneTabs(container) {
    container.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tabButton => {
      tabButton.classList.remove("active");
      tabButton.setAttribute("aria-selected", "false");
      tabButton.setAttribute("tabindex", "-1");

      const targetPaneSelector = tabButton.getAttribute("data-bs-target");
      const targetPane = targetPaneSelector
        ? document.querySelector(targetPaneSelector)
        : null;

      if (targetPane) {
        targetPane.classList.remove("active", "show");
      } else {
        console.error(`Cannot clear tab state: target pane "${targetPaneSelector}" was not found.`);
      }
    });
  }

  function switchZone(zoneName) {
    if (zoneName === activeZone) {
      return;
    }

    const previousZone = getZoneElements(activeZone);
    const nextZone = getZoneElements(zoneName);
    const Tab = window.bootstrap && window.bootstrap.Tab;

    if (!previousZone || !nextZone) {
      return;
    }
    if (!Tab) {
      console.error("Cannot switch zones: the Bootstrap Tab API is unavailable.");
      return;
    }

    clearZoneTabs(previousZone.container);
    activeZone = zoneName;

    Object.keys(zones).forEach(name => {
      if (name !== zoneName) {
        $(zones[name].container).stop(true, true).hide();
      }
    });

    $(nextZone.container).stop(true, true).slideDown(100, function() {
      if (activeZone === zoneName) {
        Tab.getOrCreateInstance(nextZone.defaultTab).show();
      }
    });
  }

  Object.keys(zones).forEach(zoneName => {
    $(zones[zoneName].parentButton).on("click", function() {
      switchZone(zoneName);
    });
  });

  $("#ZoneBarBtn").on("click", function() {
    $("#ZoneBarContent").slideToggle(100);
  });

  $("#Dashboard_MedBtn").click(function() {
  });

// Load default tab (Dashboard) on page load
window.addEventListener('DOMContentLoaded', () => {
    const defaultTab = document.querySelector('#Dashboardtab_Btn');
    if (defaultTab) {
        loadTabContent(defaultTab);
    } else {
        console.warn('Default tab #Dashboardtab_Btn not found.');
    }
});

// FIX: query ALL tab buttons across all three zone groups (not just #Home_tabs)
const triggerTabList = document.querySelectorAll('button[data-bs-toggle="tab"]');
triggerTabList.forEach(tabEl => {
    tabEl.addEventListener('shown.bs.tab', event => {
        loadTabContent(event.target);
    });
});

function loadTabContent(tabButton) {
    if (!tabButton) return;
    const targetPaneSelector = tabButton.getAttribute('data-bs-target');
    const targetPane = document.querySelector(targetPaneSelector);
    const filePath = tabButton.getAttribute('data-bs-file');

    if (!targetPane || !filePath) return;
    if (targetPane.dataset.loaded === 'true') return;

    $(targetPane).load(filePath, function(response, status, xhr) {
        if (status === "error") {
            targetPane.innerHTML = `<div class="alert alert-danger m-3">Error loading content: ${xhr.status} ${xhr.statusText}</div>`;
        } else {
            targetPane.dataset.loaded = 'true';
        }
    });
}
