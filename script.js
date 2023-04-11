window.addEventListener("scroll", function(){
    var footer = document.getElementById("myFooter");
    if(window.pageYOffset > 500){
        footer.classList.add("show-footer"); 
        this.document.getElementById("side-menu").style.display = 'none';
    } else {
        footer.classList.remove("show-footer");
    }
})
