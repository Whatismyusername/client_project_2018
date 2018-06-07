$('document').ready(function(){
    $('.songSearchDropdown2').hide();
    $('.dropdownList').hide();
    //$('.p5Canvas').css('display', 'block');
    
    var userValue;
    var myHistory = [];
    window.musicImage = null;
    window.musicChanged = false;
    
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
                $('#history' + i + 'Button').click(function(){
                    myHistory.splice(i, 1)
                })
                displayHistory();
                console.log(myHistory);
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
                    $('.displayMusic').append('<p>' + response.tracks.items[i].name + '</p>');
                    $('.displayMusic').append('<p>' + response.tracks.items[i].artists[0].name + '</p>');
                    $('.displayMusic').append('<img id="music_' + i + '" src="'+ response.tracks.items[i].album.images[0].url + '"width="100" height="100">');
                    $('.displayMusic').append('<a href="'+ response.tracks.items[i].external_urls.spotify +'" target="_blank">View Full Version</a>')
                    $('.displayMusic').append('<audio src= "' + response.tracks.items[i].preview_url + '" controls>');
                    (function(id) {
                        $('#music_' + id).click(function(){
                            window.musicImage = response.tracks.items[id].album.images[0].url;
                            window.musicChanged = true;
                            $('#container').css('display', 'block');
                            $('.arrowWrapper').toggle();
                            $('.mainPageWrapper').toggle();
                            console.log("FIRE");
                        });
                    })(i);
                    
                }
              
          },
        }); 
    }
    
    $('#container').click(function() {
        $('#container').css('display', 'none');
        $('.arrowWrapper').toggle();
        $('.mainPageWrapper').toggle();
    })
    
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