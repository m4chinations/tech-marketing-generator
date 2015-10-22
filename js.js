$(document).ready(function() {
    var canvas = document.getElementById('soylent-powered');
    var context = canvas.getContext('2d');
    var base = new Image();

    base.onload = function() {
        context.drawImage(base, 0, 0);
    };

    base.src = 'base.jpg';

    $('textarea').keyup(function() {
        draw();
    });

    $('a').click(function() {
        console.log("clicked");
        var dt = canvas.toDataURL('image/jpeg');
        this.href = dt;
    });



    function draw() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(base, 0, 0);
    
        var dear = $('#dear').val();
        var body = $('#body').val();
        var love = $('#love').val();

        context.font = '14px Nunito';
        context.fillStyle = 'white';
        context.fillText(dear, 307.5, 332.5);
        wrapText(context, body, 307.5, 369.5, 210, 20);
        wrapText(context, love, 427.5, 522.5, 100, 20);
    }


function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (words[n].indexOf('\n') != -1) {
            var tmp = words[n];
            while (tmp.indexOf('\n') != -1) {
                var pivot = tmp.indexOf('\n');
                tmp = tmp.replace('\n', '');
                line = line + tmp.substring(0, pivot);
                context.fillText(line, x, y);
                y += lineHeight;
                tmp = tmp.substring(pivot, tmp.length);
                if (words[n].indexOf('\n') == -1)
                    line = words[n].substring(pivot, words[n].length) + ' ';
                else
                    line = '';
            }
            line = tmp + ' ';
        }
        else if ((testWidth > maxWidth && n > 0)) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}
});
