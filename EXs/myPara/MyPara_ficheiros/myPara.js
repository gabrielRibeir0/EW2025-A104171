$(function(){ //executado quando o DOM é inicializado
    var paraCount = 0;
    $.get('http://localhost:3000/paras', function(plist) {
        paraCount = plist.length;
        plist.forEach(p => {
            $('#paraList').append(`
                <li p_id="${p.id}">
                    <b>${p.date}</b>: ${p.p}
                    <button class="w3-button w3-red w3-small remove-b">X</button>
                </li>
            `);
        });
    })

    $('#addPara').click(function() {
        const text = $("#paraText").val();
        const new_date = new Date();
        const date = new_date.toISOString().substring(0, 10);
        const new_p = {
            p: text,
            date: date,
            id: "p" + paraCount
        }

        $.post({
            url: 'http://localhost:3000/paras',
            data: JSON.stringify(new_p),
            headers: {'Content-Type': 'application/json'},
            dataType: 'json', 
            success: function(response) {
                alert('Registo inserido na BD: ' + JSON.stringify(response));
                $('#paraList').append(`
                    <li p_id="${new_p.id}">
                        <b>${new_p.date}</b>: ${new_p.p}
                        <button class="w3-button w3-red w3-small remove-b">X</button>
                    </li>
                `);
                paraCount++;
                $("#paraText").val("");
            },
            error: function(error) {
                alert('Ocorreu um erro: ' + JSON.stringify(error));
            }
        });
    });

    $('#paraList').on('click', '.remove-b', function() {
        let li = $(this).parent(); //this está no botão clicado, parent é o li
        let p_id = li.attr("p_id");
        console.log(li);
        console.log(p_id);
        $.ajax({
            url: 'http://localhost:3000/paras/' + p_id,
            type: 'DELETE',
            success: () => {
                li.remove();
            },
            error: (error) => {
                alert('Ocorreu um erro: ' + JSON.stringify(error));
            }
        });
    });
})