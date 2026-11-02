
$(document).ready(function(){
    

  $("#Inventory_Elements").hide();
  $("#Occasional_Elements").hide();

  $("#ParentTab1").click(function(){
    $("#Daily_Elements" ).slideDown(100, function() {};
      $("#Inventory_Elements").hide();
      $("#Occasional_Elements").hide();
     ;
  });

   $("#ParentTab2").click(function(){
    $("#Inventory_Elements" ).slideDown(100);
      $("#Daily_Elements").hide();
      $("#Occasional_Elements").hide();
      $("#Inventorytab_Btn").trigger("click");

  });
  
   $("#ParentTab3").click(function(){
    $("#Occasional_Elements" ).slideDown(100);
      $("#Daily_Elements").hide();
      $("#Inventory_Elements").hide();
      $("#MedIssuestab_Btn").trigger("click");
  });
   

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
