// Code is written in jQuery, so import jQuery before this code.

$(
    function () {

        String.prototype.repeat = function (n) {
            return new Array(n + 1).join(this);
        }

        $('#generate').click(function () {
            // Checking if table is already generated
            if ($.trim($('#game-table tr td').text()) != "Please generate the game table!"
                && !confirm("It seems game table is already genereted.\nAre you sure, you want to regenerate ?")
            ) {
                return false;
            }

            //
            $('#game-table').empty();
            var row = parseInt($('#select-row').val());
            var col = parseInt($('#select-column').val());
            var tableData = '<td class="is-size-5" contenteditable="true"></td>'.repeat(col);
            var tableRow = "<tr>" + tableData + "</tr>";
            var table = tableRow.repeat(row);
            $('#game-table').append("<tbody>"+ table + "</tbody>");
            // Prevent Enter Key on td tags
            $('#game-table tr td').keypress(function (e) {
                if (e.which == 13) {
                    $(this).next().focus();
                    return false;    //<---- Add this line
                }
            });
        });

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
