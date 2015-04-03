$(function(){
    var PARSE_APP_ID = "Q8VYVbCLqoufgnIVsP6z10EFXhcIQAjwcbrhPPIw";
    var PARSE_REST_API_KEY = "LZNeSPeEk5D6QvwIBLKqa7E3sxQlvNTjlqw8GKVa";

    loadCountries();
    var addCountry=$('#country-add');
    addCountry.on('click',addingCountry)

    function loadCountries(){
        $.ajax({
            method:"GET",
            headers:{
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url:"https://api.parse.com/1/classes/Country",
            success:countriesLoaded,
            error:ajaxError
        })

    }

    function countriesLoaded(data){
        for (var c in data.results) {
            var country=data.results[c];
            var btnDelete=$('<button>').text('Delete');
            var text=$('<span>').text(' For Delete click two times!!');
            var btnEdit=$('<button>').text('Edit');
            var countryLi=$('<li>');
            var countryLink=$('<a href="#">').text(country.name);
            $(countryLink).data('country',country);
            countryLink.appendTo(countryLi);
            countryLink.on('click',countryClick)
            countryLi.appendTo($('#countries'));
            btnEdit.appendTo(countryLink);
            btnDelete.appendTo(countryLink);
            btnDelete.on('click',deleteCountry)
            text.appendTo(countryLi);
            btnEdit.on('click',editCountry);


        }
    }

    function countryClick(){
        var country=$(this).data('country')
        $('#towns').hide();
        $('#towns h2').text(country.name);
        var countryId=country.objectId;
        $.ajax({
            method:"GET",
            headers:{
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}',
            success: townsLoaded,
            error: ajaxError
        })
    }

    function deleteCountry(){
        $('#container').html('');
        $('#container').show();
        var country=$(this).parent().data('country');
        var countryId=country.objectId;
        $(this).click(function(){
            $('#countries').html('');
            $.ajax({
                method:"DELETE",
                headers:{
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Country/'+countryId,
                success: loadCountries,
                error: ajaxError
            })
            $('#container').show();
        })
//        if($('#towns h2').text()===country.name){
//            $('#towns h2').css('visibility','hidden');
//        }
//
//         $('#towns h2').css('visibility','visible');


    }

    function deleteTown(){
//        $('#add-town').html('');
        $('#add-town').show();
        var town=$(this).data('town');
        var townId=town.objectId;
        $(this).click(function() {

            $.ajax({
                method: "DELETE",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Town/' + townId,
                success: townsLoaded,
                error: ajaxError
            })
            $('#add-town').hide();
        })
    }

    function editCountry(){
        $('#edit').show();
        $('#container').html('');
        $('#container').show();
        var editInput=$('<input>').attr('type','text').attr('id','edit-input');
        editInput.appendTo($('#edit'));
        var editBtn=$('<button>').text('Submit').attr('id','btn-input');
        editBtn.appendTo($('#edit'));
        var country=$(this).parent().data('country');
        var countryId=country.objectId;
        editBtn.click(function(){
            var value=$('#edit-input').val();
            $('#countries').html('');
            $.ajax({
                method:"PUT",
                headers:{
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                data:JSON.stringify({"name":value}),
                url:'https://api.parse.com/1/classes/Country/'+countryId,
                contentType: "application/json",
                success:loadCountries,
                error: ajaxError
            })
            $('#edit').hide();
        });

    }

    function editTown(){
        $('#edit-town').show();
        var editInput=$('<input>').attr('type','text').attr('id','edit-input-town');
        editInput.appendTo($('#edit-town'));
        var editBtn=$('<button>').text('Submit').attr('id','btn-input-town');
        editBtn.appendTo($('#edit-town'));
        var town=$(this).data('town');
        var townId=town.objectId;
        editBtn.click(function(){
            var value=$('#edit-input-town').val();
            $('#towns ul').html('');
            $.ajax({
                method:"PUT",
                headers:{
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                data:JSON.stringify({"name":value}),
                url:'https://api.parse.com/1/classes/Town/'+townId,
                contentType: "application/json",
                success:townsLoaded,
                error: ajaxError
            })
            $('#edit-town').hide();
        });

    }

    function addingCountry(){
        $('#container').html('');
        $('#container').show();
        var value;
        var input=$('<input>').attr('type','text');
        input.appendTo($('#container')).attr('id','add-input');
        var btn=$('<button>').text('Submit').appendTo($('#container')).attr('id','add-btn');
        btn.click(function(){
            value=$('#add-input').val();
            $('#countries').html('');
            $.ajax({
                method:"POST",
                headers:{
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                data:JSON.stringify({"name":value}),
                url:'https://api.parse.com/1/classes/Country/',
                contentType: "application/json",
                success:loadCountries,
                error: ajaxError
            })
            $('#container').hide();

        });

    }


    function addingTown(country){
        $('#add-town').html('');
        $('#add-town').show();
        var input=$('<input>').attr('type','text');
        input.appendTo($('#add-town')).attr('id','add-town-input');
        var btn=$('<button>').text('Submit').appendTo($('#add-town')).attr('id','add-btn-town');
        btn.click(function(){
            var value=$('#add-town-input').val();
            $.ajax({
                method:"POST",
                headers:{
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                data:JSON.stringify({"name":value,
                    "country":{
                        "__type": "Pointer",
                        "className": "Country",
                        "objectId": country
        }
                }),
                url:'https://api.parse.com/1/classes/Town/',
                contentType: "application/json",
                success:townsLoaded,
                error: ajaxError
            })
            $('#add-town').hide();
        });
    }

    var addTownBtn=$('<button>').text('Add').appendTo($('#towns'));


    function townsLoaded(data){

        $('#towns ul').html('');

        for (var t in data.results) {
            var town=data.results[t];
            var country=data.results[t].country.objectId;
            var li=$('<li>').text(town.name).appendTo($('#towns ul'));
            var btnDelete=$('<button>').text('Delete');
            var btnEdit=$('<button>').text('Edit');
            var text=$('<span>').text(' For Delete click two times!!');
            btnEdit.appendTo(li);
            btnDelete.appendTo(li);
            text.appendTo(li);
            btnDelete.data({'town':town});
            btnDelete.on('click',deleteTown);
            btnEdit.data({'town':town})
            btnEdit.on('click',editTown)


        }
        addTownBtn.on('click',addingTown(country));
        $('#towns').show();

    }

    function ajaxError() {
        alert('Error')
    }
})
