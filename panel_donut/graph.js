// hard-coding dimensions

var graph_dims = {height: 230, width: 200},
    donut_dims = {centX: 100, centY: 130,
        innerRadius: 80, outerRadius: 100}

var svg = d3.select('#chart')
    .attr('width', graph_dims.width)
    .attr('height', graph_dims.height);

var graph = svg.append('g')
    .attr('transform', 'translate(' + donut_dims.centX + ',' + donut_dims.centY + ')');

var pie = d3.layout.pie()
    .value(function (d) {return d.ratio_current});

var arcPath = d3.svg.arc()
    .outerRadius(donut_dims.outerRadius)
    .innerRadius(donut_dims.innerRadius);

var colors = ['#0066B3', 'white'];

var title = svg.append('text')
    .attr('class', 'title');

var current = svg.append('text')
    .attr('class', 'current');

var delta = svg.append('text')
    .attr('class', 'delta');

pbi.dsv(function (data) {


    // creating pie data
    var current_data = [
        {ratio_current: parseFloat(data[0].ratio_current)},
        {ratio_current: 100 - data[0].ratio_current}
    ];

    // join enhanced (pie) data to path elements
    const paths = graph.selectAll('path')
        .data(pie(current_data));

    // handle the enter selection
    paths.enter()
        .append('path')
            .attr('class', 'arc')
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .attr('fill', 'grey')
            .attr('d', function(d) {return arcPath(d)})
            .each(function(d) { this._current = d })

    svg.select('.title')
        .data(data)
        .text(function (d) { return d.question_name});

    svg.select('.current')
        .data(data)
        .text(function (d) {
            if (d.ratio_current === 'null') {
                return parseFloat('0').toFixed(1);
            } else {
                return parseFloat(d.ratio_current).toFixed(1);
            }
        });

    svg.select('.delta')
        .data(data)
        .text(function (d) {
            if (d.difference === 'null') {
                return parseFloat('0').toFixed(1);
            } else {
                return parseFloat(d.difference).toFixed(1);
            };
        })
        .style('fill', function (d) {
            if (d.p_value < 0.05 && d.difference > 0) {
                return 'green'
            } else if (d.p_value < 0.05 && d.difference < 0) {
                return 'red'
            } else {
                return 'black'
            };
        });
});

