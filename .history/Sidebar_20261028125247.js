//This file used to link the menubar to the different pages by appending to a specific id
//through jQuery


$(document).ready(function(){
let Menu=`

<span style="float: left;">
<button id="Menu_Bar"><img src="menubar_Btn.png" alt="Error"></button>



<div id="Menu">
    <button id="Menu_Close"><img src="Close_Btn.png" alt="Error"></button>
<br>   
    <a href="dashboard.html"> <div class="Menu_Option">Dashboard</div> </a>

    <a href="user_management.html"><div class="Menu_Option">User</div></a>
 
    <a href="medicine_management.html"><div class="Menu_Option">Medicine  </div></a>
 
    <a href="supplier_management.html"><div class="Menu_Option">Suppliers</div></a>

    <a href="purchase_management.html"> <div class="Menu_Option">Purchases</div></a>

    <a href="batch_management.html"> <div class="Menu_Option">Batch</div></a>

    <a href="inventory.html"><div class="Menu_Option">Inventory</div></a>
  
    <a href="issue.html"><div class="Menu_Option">Medicine Issue</div></a>

    <a href="return.html"><div class="Menu_Option">Medicine Return</div></a>
 
    <a href="register.html"><div class="Menu_Option" id="Logou_Btn">Logout ==></div></a>

 
</div> 
  
<style>   
    #Menu_Bar img{
        visibility: visible;
        width: 30px; 
        cursor: pointer;
          
    }
    #Menu_Bar img:hover{
        border-color:solid 2px brown;
    }
    
    #Menu_Close{
       visibility: hidden;
        float: right;
    }
    #Menu_Close img{
        cursor: pointer;
        width: 30px;
        visibility: visible;
    }

    body{
        margin: 0;
        padding: 10px;
    }
    #Menu{  
        float: left;width: 250px;
        min-height: 100vh;background-color: rgba(169, 125, 210, 0.968);
        border:solid;
        overflow:visible;display: none; 
        text-align: center;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
         font-size: x-large;
         font-weight: bold;

    }
    #Menu a{
        text-decoration: none; 
        display: inline;
        
    }
    .Menu_Option{ 
        color: white;
        width: auto;text-align: center;
        background-color: rgb(130, 78, 209);
        cursor: pointer;
        height: 30px;margin: 10px;border-radius: 5px;
        padding: 5px;border: solid 2px hsl(17, 36%, 72%);
    }
    .Menu_Option:hover{
        border-radius: 10px;
        transition: 100ms;
        background-color: rgb(18, 65, 122);
        color: beige;
    }
    

</style>


<script>
    $(document).ready(function(){
        $("#Menu_Bar").click(function(){
            $("#Menu").show(200);
            $("#Menu").css("margin","0px");
            $("#Menu_Bar").fadeOut();
            
        });
        $("#Menu_Close").click(function(){
            $("#Menu").hide(200);
            $("#Menu_Bar").show();
        });
        $("#Menu_Bar").focus(function(){
            $("#Menu").hide(200);
            $("#Menu_Bar").show();
        })
    });
</script>

</span>  
    `;
    $("#Menubar_Call").append(Menu);
});

