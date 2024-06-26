let homeSec = document.querySelector('.homeSec');

homeSec.addEventListener('click',function(){
    window.open('./index.html','_self') ;
    document.querySelector('.homeSec').classList.add('active');
    document.querySelector('.contact').classList.remove('active');

});