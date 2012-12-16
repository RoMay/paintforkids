var raster = new Raster('background');
var lastScale = 1;

//var center = view.center;
raster.fitBounds(view.bounds);
var painting = false;
var Obj = (function() {
	var style = {
		strokeWidth : {
			large : 40,
			medium : 20,
			small : 5
		},
		strokeColor : {
			red : '#FF0000',
			yellow : '#FFFF00',
			blue : '#0000FF',
			brown : '#A52A2A',
			green : '#008000',
			black : '#000000'
		}
	}

	return {
		options : {
			strokeColor : style.strokeColor.brown,
			strokeWidth : style.strokeWidth.medium,
			strokeCap : 'round'
		},

		path : {},

		add_path : function(points) {
			//console.log("add");
			this.path = new Path();
			this.path.style = this.options;
			this.path.strokeColor.alpha = 0.5
		},

		move_path : function(points) {
			this.path.add(new Point(points));
			this.path.smooth();
		},

		finalize_path : function() {
			this.path.strokeColor = this.options.strokeColor;
			this.path.simplify();
		},

		update_options : function(newoptions) {

			this.options[newoptions.style] = style[newoptions.style][newoptions.value];

		},

		test : function() {
			console.log("test")
		}
	};

})();

//console.log(Obj);

project.activeLayer.position = view.center;

function onMouseMove(event) {

	if (!painting)
		return;

	Obj.move_path(event.point);

}

function onMouseDown(event) {

	//path.fullySelected = true;
	painting = true;
	Obj.add_path(event.point);

}

function onMouseUp(event) {

	//path.fullySelected = false;
	painting = false;
	Obj.finalize_path();

}

// Reposition the paths whenever the window is resized:
function onResize(event) {
	project.activeLayer.position = view.center;
}

// Panel Stuff ON

$(function() {
	$("#canvas").bind("mousedown touchstart", function() {

		$("#toggle-panel").addClass("hideId");
	});

	$("#canvas").bind("mouseup touchend", function() {

		$("#toggle-panel").removeClass("hideId")
	})

	$("#toggle-panel ul li").bind("mousedown touchstart", function(i, e) {

		Obj.update_options({
			style : $(this).parent().data("style"),
			value : $(this).attr("id")
		});
	});
})