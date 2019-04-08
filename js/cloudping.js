// Code is written in jQuery, so import jQuery before this code.

$(
    function () {

        String.prototype.repeat = function (n) {
            return new Array(n + 1).join(this);
        }

        $.continuePing = 0
        $.testSet = 0

        $.regionsx = {
                 "us-east-2" : ["US East (Ohio)", [0, 0, 0], []],
                 "us-east-1" : ["US East (N. Virginia)", [0, 0, 0], []],
                 "us-west-1" : ["US West (N. California)", [0, 0, 0], []],
                 "us-west-2" : ["US West (Oregon)", [0, 0, 0], []],
                "ap-south-1" : ["Asia Pacific (Mumbai)", [0, 0, 0], []],
            "ap-northeast-3" : ["Asia Pacific (Osaka-Local)", [0, 0, 0], []],
            "ap-northeast-2" : ["Asia Pacific (Seoul)", [0, 0, 0], []],
            "ap-southeast-1" : ["Asia Pacific (Singapore)", [0, 0, 0], []],
            "ap-southeast-2" : ["Asia Pacific (Sydney)", [0, 0, 0], []],
            "ap-northeast-1" : ["Asia Pacific (Tokyo)", [0, 0, 0], []],
              "ca-central-1" : ["Canada (Central)", [0, 0, 0], []],
                "cn-north-1" : ["China (Beijing)", [0, 0, 0], []],
            "cn-northwest-1" : ["China (Ningxia)", [0, 0, 0], []],
              "eu-central-1" : ["EU (Frankfurt)", [0, 0, 0], []],
                 "eu-west-1" : ["EU (Ireland)", [0, 0, 0], []],
                 "eu-west-2" : ["EU (London)", [0, 0, 0], []],
                 "eu-west-3" : ["EU (Paris)", [0, 0, 0], []],
                "eu-north-1" : ["EU (Stockholm)", [0, 0, 0], []],
                 "sa-east-1" : ["South America (São Paulo)", [0, 0, 0], []],
             "us-gov-east-1" : ["AWS GovCloud (US-East)", [0, 0, 0], []],
             "us-gov-west-1" : ["AWS GovCloud (US)", [0, 0, 0], []],
        };

        $.tableHeader = ["Region", "Region code", "Avg", "Min", "Max"]


        $.regions = {
                1 :  [ "us-east-2", "US East (Ohio)", [0, 0, 0], []],
                2 :  [ "us-east-1", "US East (N. Virginia)", [0, 0, 0], []],
                3 :  [ "us-west-1", "US West (N. California)", [0, 0, 0], []],
                4 :  [ "us-west-2", "US West (Oregon)", [0, 0, 0], []],
                5 :  [ "ap-south-1", "Asia Pacific (Mumbai)", [0, 0, 0], []],
                6 :  [ "ap-northeast-3", "Asia Pacific (Osaka-Local)", [0, 0, 0], []],
                7 :  [ "ap-northeast-2", "Asia Pacific (Seoul)", [0, 0, 0], []],
                8 :  [ "ap-southeast-1", "Asia Pacific (Singapore)", [0, 0, 0], []],
                9 :  [ "ap-southeast-2", "Asia Pacific (Sydney)", [0, 0, 0], []],
                10 : [ "ap-northeast-1", "Asia Pacific (Tokyo)", [0, 0, 0], []],
                11 : [ "ca-central-1", "Canada (Central)", [0, 0, 0], []],
                12 : [ "cn-north-1", "China (Beijing)", [0, 0, 0], []],
                13 : [ "cn-northwest-1", "China (Ningxia)", [0, 0, 0], []],
                14 : [ "eu-central-1", "EU (Frankfurt)", [0, 0, 0], []],
                15 : [ "eu-west-1", "EU (Ireland)", [0, 0, 0], []],
                16 : [ "eu-west-2", "EU (London)", [0, 0, 0], []],
                17 : [ "eu-west-3", "EU (Paris)", [0, 0, 0], []],
                18 : [ "eu-north-1", "EU (Stockholm)", [0, 0, 0], []],
                19 : [ "sa-east-1", "South America (São Paulo)", [0, 0, 0], []],
                20 : [ "us-gov-east-1", "AWS GovCloud (US-East)", [0, 0, 0], []],
                21 : [ "us-gov-west-1", "AWS GovCloud (US)", [0, 0, 0], []],
        };

        $.regions_list_count = 21;


        // Initial Table building
        var tableRows = ""
        var tableData = ''
        $.tableHeader.forEach(function(column_name){
            tableData += '<td>' + column_name + '</td>'
        });
        tableRows += "<tr>" + tableData + "</tr>"
        
        Object.keys($.regions).forEach(function(region_id) {
            var tableData = '<td>' + $.regions[region_id][1] + '</td>'
               tableData += '<td>' + $.regions[region_id][0] + '</td>'
               tableData += '<td></td>'
               tableData += '<td></td>'
               tableData += '<td></td>'
               tableRows += "<tr>" + tableData + "</tr>"
        });
        $('#ping-table').empty();
        $('#ping-table').append("<tbody>"+ tableRows + "</tbody>");

        $.buildData =  function (){
            Object.keys($.regions).forEach(function(region_id) {
                sum = min = max = avg = 0
                stat = $.regions[region_id][2]
                list = $.regions[region_id][3]
                list.forEach(function(item, index) {
                    sum += item;
                    min = ( min === 0 ) ? item : ( item <= min  ) ? item : min;
                    max = ( item >= max ) ? item : max;
                });
                avg = (list.length > 0) ? sum / list.length : 0;
                avg = Math.round(avg)
                stat.min = min; stat.max = max; stat.avg =  avg;
                $.regions[region_id][2] = stat
            });
        }

        $.buildTable = function(){
            // Table building
            var tableRows = ""
            var tableData = ''
            $.tableHeader.forEach(function(column_name){
                tableData += '<td>' + column_name + '</td>'
            });
            tableRows += "<tr>" + tableData + "</tr>"

            Object.keys($.regions).forEach(function(region_id) {
                var tableData = '<td>' + $.regions[region_id][1] + '</td>'
                tableData += '<td>' + $.regions[region_id][0] + '</td>'
                tableData += '<td>'+ $.regions[region_id][2].avg +'</td>'
                tableData += '<td>'+ $.regions[region_id][2].min +'</td>'
                tableData += '<td>'+ $.regions[region_id][2].max +'</td>'

                // Build columns for ping data
                list = $.regions[region_id][3]
                list.forEach(function(item, index) {
                    tableData += '<td>'+ item +'</td>'
                });
                tableRows += "<tr>" + tableData + "</tr>"
            });

            $('#ping-table').empty();
            $('#ping-table').append("<tbody>"+ tableRows + "</tbody>");
        }

        $("#pingnow").click( clickFunc );

        // ------------------------------------------
        // ------------------------------------------

        async function clickFunc(){
            setTimeout($.changeIt2, 500);
        }

        $.changeIt2 = async function() {
            $.continuePing = 0;
            $.testSet = $.testSet + 1
            $.tableHeader.push("Test " + $.testSet )

            $("#pingnow").slideToggle(400, function(){
                $(".ping-button-spinner").slideToggle(400);
            });
            asynCall();
        }


        async function asynCall (){
            var i = 123213131231
            $.continuePing = i = ($.continuePing + 1)
            try {
                var quote = await checkHealthStatus(i)
                $.buildData()
                $.buildTable()
                setTimeout(asynCall, 40);
            } catch (error) {

            }
            
            if( $.continuePing === $.regions_list_count ){
                $(".ping-button-spinner").slideToggle(400, function(){
                    $("#pingnow .button-label").html("Ping Again!")
                    $("#pingnow").slideToggle(400);
                });
            }
        }

        function checkHealthStatus( region_id  ) {
            var id = $.uniqString() + $.regions[region_id][0]
            var url = "http://ec2." + $.regions[region_id][0] + ".amazonaws.com/ping"//?random=" + id 
            var xhttp = new XMLHttpRequest();
            var start_time = Date.now();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var time_taken = Date.now() - start_time;
                    $.regions[region_id][3].push(time_taken)
                }
            };
            xhttp.open("GET", url, false);
            try {
                start_time = Date.now(); xhttp.send();
            } catch (error) {
                console.log(error)
            }
        }


        $.uniqString = function() { // function uuidv4()
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        $.pingItx = function(){
            Object.keys($.regions).forEach(function(region) {
                var url = "http://ec2." + region + ".amazonaws.com/ping"
                //console.log($.continuePing + " ----- " + url)
                var url = "http://ec2." + 'ap-south-1' + ".amazonaws.com/ping"
                var xhttp = new XMLHttpRequest();
                var start_time = Date.now();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        $.regions['ap-south-1'][2].push( ( Date.now() - start_time ) )
                        $.buildData()
                        $.buildTable()
                    }
                };
                xhttp.open("GET", url, true);
                var start_time = Date.now();
                xhttp.send();
                
                //$.ajax({
                //    url: url,
                //    async: false,
                //    method: 'GET',
                //    start_time: Date.now(),
                //    beforeSend: function(){
                //        this.start_time = Date.now();
                //    },
                //    complete: function(data) {
                //        var time_taken = (Date.now() - this.start_time)
                //        $.regions[region][2].push(time_taken) 
                //        $.buildData()
                //        $.buildTable()
                //        //alert('This request took '+(new Date.getTime() - this.start_time)+' ms');
                //     }
                // });
            });
        }

        $.changeIt = function() {
            Object.keys($.regions).forEach(function(region) {
                var id = $.uniqString() + region
                var url = "http://ec2." + region + ".amazonaws.com/ping?random=" + id
                var start_time = Date.now()
                $.get(url, function(){})
                var time_taken = Date.now() - start_time;
                $.regions[region][2].push( time_taken )
                $.buildData()
                $.buildTable()
            });
        }

          

        $.changeIt1 = function() {
            Object.keys($.regions).forEach(function(region) {
                var id = $.uniqString() + region
                var url = "http://ec2." + region + ".amazonaws.com/ping?random=" + id 
                var html = '<img id="'+ id +'" style="display:none;" src="">'
                $("#blankImages").append(html)
                //var elem = document.getElementById(id)
                var start_time = Date.now()
                //elem.src = url
                $("#" + id).attr("src", url);
                var time_taken = Date.now() - start_time;
                $.regions[region][2].push( time_taken )
                $.buildData()
                $.buildTable()
            });
        }

        $.uniqString = function() { // function uuidv4()
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }



        $.checkNumbers = function () {
            var numbersList = $("#numbers").val().split(/[,]/);

            if (numbersList) {
                for (let index = 0; index < numbersList.length; index++) {
                    let element = numbersList[index];
                    element.replace(/\D+/g, '');
                    numbersList[index] = parseInt(element, 10);
                }
            } else {
                numbersList = [];
            }

            $('#game-table tr td').each(function () {
                $(this).removeClass("has-background-primary");
                var str = $(this).text();
                str.replace(/\D+/g, '');
                var num = parseInt(str, 10);
                if (num) {
                    for (let index = 0; index < numbersList.length; index++) {
                        if (num === numbersList[index]) {
                            $(this).addClass("has-background-primary");
                        }
                    }
                }
            });
        }

        // Show result on pressing Enter key
        $("#numbers").keypress(function (e) {
            if (e.which == 13) {
                $.checkNumbers();
                $.displayResult();
                return false;    //<---- Add this line
            }
        });

        $.displayResult = function () {
            // First checking for rows
            var num_rows = $("#game-table tr").length;
            var num_cols = $("#game-table tr:first-child td").length;
            var all_rows_matched = true;
            var all_cols_matched = true;
            var result_message = [];

            // Checking for rows matched
            for (let index = 1; index <= num_rows; index++) {
                var flag = true;
                let selector = "#game-table tr:nth-child(" + index + ") td";
                $(selector).each(function (index) {
                    let str = $(this).text();
                    if ($(this).hasClass('has-background-primary') || (str === undefined || str == "")) {
                        return;
                    } else {
                        flag = false;
                    }
                });

                if (flag) {
                    result_message.push($.getResultMessage(index, num_rows, "row"));
                } else {
                    all_rows_matched = false;
                }
            }

            // Checking for columns matched
            for (let index = 1; index <= num_cols; index++) {
                let selector = "#game-table tr td:nth-child(" + index + ")";
                var flag = true;
                $(selector).each(function (index) {
                    let str = $(this).text();
                    if ($(this).hasClass('has-background-primary') || (str === undefined || str == "")) {
                        return;
                    } else {
                        flag = false;
                    }
                });

                if (flag) {
                    result_message.push($.getResultMessage(index, num_cols, "column"));
                } else {
                    all_rows_matched = false;
                }
            }


            $("#result-display-box").empty();

            // Add messages to result
            $("#result-display-box").empty();
            if (all_rows_matched && all_cols_matched) {
                $("#result-display-box").append($.getResultMessage(0, 0, "Full House!"));
            } else {
                $("#result-display-box").append(result_message.join(''));
            }
        };

        // Get result message
        $.getResultMessage = function (index, length, type) {
            var msg = "";
            if (index === 0) {
                msg = "Full House !!!";
            } else if (index === 1) {
                msg = "First " + type + " matched";
            } else if (length - index === 0) {
                msg = "Last " + type + " matched";
            } else if (index === 2) {
                msg = "2nd " + type + " matched";
            } else if (index === 3) {
                msg = "3rd " + type + " matched";
            } else if (index === 4) {
                msg = "4th " + type + " matched";
            } else {
                msg = index + "th " + type + "     matched";
            }

            msg = '<li>'
                + '<span class="icon has-text-success"><i class="fas fa-check-square"></i></span>'
                + '<span style="vertical-align:top;">'
                + msg
                + '</span>'
                + '</li>';

            return msg;
        };
    }
);
