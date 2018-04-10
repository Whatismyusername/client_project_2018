$('document').ready(function(){
    $('.songSearchDropdown2').hide();
    var userValue;
    var history = []
    
    function thisValueIsIncludedInHistory(value){
        for(var i = 0; i <= history.length; i++){
            if(value === history[i]){
                return true;
            }
            return false;
        }
    }
    $('.songSearchBtn').click(function(){
        userValue = $('.songSearchInput').val();
        if(thisValueIsIncludedInHistory(userValue) === false){
            history.push(userValue);    
        }
        console.log(history)
    })
    
    $('.songSearchDropdown').click(function(){
        $('.songSearchDropdown').toggle();
        $('.songSearchDropdown2').toggle();
        
    })
    $('.songSearchDropdown2').click(function(){
        $('.songSearchDropdown').toggle();
        $('.songSearchDropdown2').toggle();
    })
})