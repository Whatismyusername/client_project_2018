$('document').ready(function(){
    $('.songSearchDropdown2').hide();
    $('.dropdownList').hide();
    
    var userValue;
    var myHistory = [];
    
    function thisValueIsIncludedInHistory(value){
        for(var i = 0; i <= myHistory.length; i++){
            if(value === myHistory[i]){
                return true;
            }
            return false;
        }
    }
    
    function addHistory(){
        if(thisValueIsIncludedInHistory(userValue) === false){
            myHistory.push(userValue);
        }
        displayHistory();
    }
    
    function displayHistory(){
        console.log(myHistory)
        $('.dropdownContent').empty();
        for(var i = 0; i < myHistory.length; i++){
            $('.dropdownContent').append('<input class="dropdownWords" id="history' + i + 'Input" placeholder="' + myHistory[i] + '" disabled >');
            $('.dropdownContent').append('<button class="deleteHistory" id="history' + i + 'Button">&#xd7;</button>');
            $('#history' + i + 'Input').click(function(){
                userValue = $('#history' + i + 'Input').val();
                searchForMusic(userValue);
            })
            $('#history' + i + 'Button').click(function(){
                displayHistory();
            })
        }
        $('.dropdownContent').append('<input class="dropdownWords" placeholder= "Clear All History" disabled >');
        $('.dropdownContent').append('<button class="deleteHistory" id="deleteAllHistory">&#xd7;</button>');
        $('#deleteAllHistory').click(function(){
            console.log("fire")
            deleteAllHistory();
        });
        
    }
    
    function deleteAllHistory(){
        myHistory = [];
        displayHistory();
    }
    
    function searchForMusic(searchTerm) {
        $.ajax({
            url: "https://ajar-target.glitch.me/spotify/search?q=" + searchTerm + "&SCRIPTED=AWESOME",
            method: "GET",
            success: function(response) {
                $('.displayMusic').empty();
                for (var i = 0; i < response.tracks.items.length; i++){
                    $('.displayMusic').append('<p> ' + response.tracks.items[i].name + '</p>');
                    $('.displayMusic').append('<audio src= "' + response.tracks.items[i].preview_url + '" controls>');
                }
              
          },
        }); 
    }
    
    function historySearch(){
        for (var i = 0; i < myHistory.length - 1; i++){
            $('#history' + i + 'Input').click(function(){
                userValue = myHistory[i];
                searchForMusic(userValue);
            })
        }
        
    }
    
    
    $('.songSearchBtn').click(function(){
        userValue = $('.songSearchInput').val();
        addHistory();
        historySearch();
        searchForMusic(userValue);
        $('.songSearchInput').val('');
    })
    
    $('.songSearchDropdown').click(function(){
        $('.songSearchDropdown').toggle();
        $('.songSearchDropdown2').toggle();
        $('.dropdownList').toggle();
    })
    $('.songSearchDropdown2').click(function(){
        $('.songSearchDropdown').toggle();
        $('.songSearchDropdown2').toggle();
        $('.dropdownList').toggle();
    })
    $('#deleteAllHistory').click(function(){
        deleteAllHistory();
    });
    
    
})