const dims = { height: pbi.width, width: pbi.height, radius: pbi.width / 2 };
const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

var svg = d3.select('#chart')
    .attr('width', dims.width)
    .attr('height', dims.height);

var graph = svg.append('g')
    .attr('transform', 'translate(' + cent.x + ',' + cent.y + ')');

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {return d.ratio_current});

var arcPath = d3.svg.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius / 2);

var title = svg.append('text')
    .attr('class', 'title');

var current = svg.append('text')
    .attr('class', 'current');

var delta = svg.append('text')
    .attr('class', 'delta');

pbi.dsv(function (data) {

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