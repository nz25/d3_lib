var data = {
    a: 200,
    b: 200,
    c: 200
};
var center = {
    x: 250,
    y: 300
};

var triangles = document.getElementsByTagName('path');

// triangles[0].setAttribute('d', 'M 250 100 L 250 300 L 87 400 Z');
// triangles[1].setAttribute('d', 'M 250 100 L 250 300 L 413 400 Z');
// triangles[2].setAttribute('d', 'M 250 300 L 413 400 L 87 400 Z');

var d_values = calculate_d(data, center);
for (i = 0; i < d_values.length; i++) {
    triangles[i].setAttribute('d', d_values[i]);
};

function calculate_d(data, center) {

    var values = [];
    
    // 1st triangle (left)
    var left_top = {x: center.x, y: center.y - data.a};
    var left_right = {x: center.x, y: center.y};
    var left_left = {x: center.x - Math.sqrt(3) / 2 * data.b, y: center.y + data.b / 2};
    values[0] = `M ${left_top.x} ${left_top.y} L ${left_right.x} ${left_right.y} L ${left_left.x} ${left_left.y} Z`

    // 2nd triangle (right)
    var right_top = {x: center.x, y: center.y - data.a};
    var right_right = {x: center.x + Math.sqrt(3) / 2 * data.c, y: center.y + data.c / 2};
    var right_left = {x: center.x, y: center.y};;
    values[1] = `M ${right_top.x} ${right_top.y} L ${right_right.x} ${right_right.y} L ${right_left.x} ${right_left.y} Z`

    // 3rd triangle (bottom)
    var bottom_top = {x: center.x, y: center.y};
    var bottom_right = {x: center.x + Math.sqrt(3) / 2 * data.c, y: center.y + data.c / 2};
    var bottom_left = {x: center.x - Math.sqrt(3) / 2 * data.b, y: center.y + data.b / 2};
    values[2] = `M ${bottom_top.x} ${bottom_top.y} L ${bottom_right.x} ${bottom_right.y} L ${bottom_left.x} ${bottom_left.y} Z`

    return values;

};