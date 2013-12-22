var fly = fly || {};
fly.app = fly.app || {};

(function(air) {

  draw = function(data) {
    var margin = {top: 10, right: 20, bottom: 25, left: 10},
      width = ($('#viz').width()) - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

      var maxFile = d3.max(data, function(d) {return d.file;});
      var maxAlt = d3.max(data, function(d) {return d.altitude;});
      var maxSpeed = d3.max(data, function(d) {return d.gspeed;});

      var x = d3.scale.linear()
          .range([0, width - margin.left - margin.right])
          .domain([0, maxFile]);
      var y = d3.scale.linear()
          .range([height - margin.top - margin.bottom, 0])
          .domain([0, maxAlt]);
      var speedY = d3.scale.linear()
          .range([height - margin.top - margin.bottom, 0])
          .domain([0, maxSpeed]);

      var xAxis = d3.svg.axis().scale(x)
          .tickSize(height - margin.top - margin.bottom)
          .tickPadding(10),
        yAxis = d3.svg.axis().scale(y)
          .orient('left')
          .tickSize(-width + margin.left + margin.right)
          .tickPadding(10);

      svg = d3.select('#viz').select('svg').select('g');
      if (svg.empty()) {
        svg = d3.select('#viz')
          .append('svg:svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'viz')
          .append('svg:g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      }

      svg.append('g')
        .call(yAxis);

      svg.append('g')
        .call(xAxis);

      var dataLines = svg.selectAll('.data-line')
        .data([data]);

      var altLine = d3.svg.line()
        .x(function(d, i) {return x(d.file);})
        .y(function(d, i) {return y(d.altitude);});

      var speedLine = d3.svg.line()
        .x(function(d, i) {return x(d.file);})
        .y(function(d, i) {return speedY(d.gspeed);});

      dataLines
        .enter()
        .append('path')
            .attr('class', 'alt-line')
            .attr('d', altLine(data));

      dataLines
        .enter()
        .append('path')
            .attr('class', 'speed-line')
            .attr('d', speedLine(data));
  };

  air.init = function() {
    $.getJSON('js/data/data.json', draw);
  };

})(fly.app);
