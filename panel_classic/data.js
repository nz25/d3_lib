var pbi = {
    width: 250,
    height: 200,
    color: [
        "#01B8AA",
        "#374649",
        "#FD625E",
        "#F2C80F",
        "#5F6B6D",
        "#8AD4EB",
        "#FE9666",
        "#A66999"
    ],
    dsv: function(accessor,callback) {
        data=[
            {
                ratio_current: '92.308',
                difference: '-2.627',
                p_value: '0.0316',
                question_name: 'Gestützte Markenbekanntheit', 
            },
        ];
        if (arguments.length<2) {
            callback=accessor, accessor=null;
        } else {
            data = data.map(function(d) {return accessor(d) });
        }
        callback(data);
    }
}