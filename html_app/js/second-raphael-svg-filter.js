/* Raphael extensions to support SVG filters on Raphael shapes. 
 * 
 * @author: Sebastián Gurin (sg - sgurin - cancerbero_sgx)
 * 
 * The api consist on  a general API for administer "filter". the API for this is general and is very similar to SVG: 
 * Concepts: 
 * 
 * Filter: define a filter for one or more shapes to use. Each filter is added in paper.defs
 * 	and one or more shapes can use this filter. A filter contains one or more FilterOperations. 
 * 
 * FilterOperation: a filter contains an array of FilterOperations that correspond to one SVG filter operation like 
 * feSpecularLighting, feComposwite, etc. 
 * 
 * FilterOperationParams - an object that contains the filter operation parameters. 
 * 
 *  Use case
 *  var paper = Raphael(...); 
 *  var filter1 = paper.filterCreate("filter1");
 *  
 *  var fop1Params = {funcR: {..}, ...}, //def of a svg componentTransfer
 *  	fop1 = Raphael.filter.componentTransfer(fop1Params); //the filteroperation object
 *  
 *  //add the filter operation to the filter object
 *  filter1.appendOperation(fop1); 
 *  
 *  var img1 = paper.image(...)
 *  img1.filterInstall(filter1); 
 *  ..
 *  aSet.filterUninstall(filter1); 
 *  ..
 *  img1.filterUninstall(filter1); 
 *  
 *  
 *  
 *  Reference: 
 *  
 *  - Filter: an object{filterId}  
 *  
 *  - FilterOperation: an object {name, appendToFilterEl, filter} - where name is 
 *  the name of the filter operation such as feGaussianBlur, feSpecularLighting, etc. 
 *  and where appendToFilterEl is a function that appends  a SVG filter 
 *  operation inside the passed SVG filter element.
 *  Note: SVG filter operations are currently expressed as XML elements. 
 *  the appendToFilterEl defines de filter operation by creating this element according to the
 *  FilterOperationParams object. So the user work with json objects that 
 *  currently will create the svg filter children.  
 *   
 *  TODO: svg filter common attributes, and filter output, referencing and composing....
 *  
 *  common attributes sollution: 
 * */

(function() {

	var $ = function(el, attr) {
		if (attr) {
			for ( var key in attr)
				if (attr.hasOwnProperty(key)) {
					el.setAttribute(key, attr[key]);
				}
		} else {
			return document.createElementNS("http://www.w3.org/2000/svg", el);
		}
	};

	Raphael.fn.filterCreate = function(filterId) {
		var paper = this;
		if (!paper._filters)
			paper._filters = {};

		var filterEl = $("filter");
		paper._filters[filterId] = filterEl;
		$(filterEl, {
			id : filterId
		});
		paper.defs.appendChild(filterEl);
		return {
			"paper" : paper,
			"filterId" : filterId,
			"appendOperation" : function(filterOp) {
				this.paper.filterAddOperation(this, filterOp);
			},
			"removeOperation" : function(filterOp) {
				this.paper.filterRemoveOperation(this, filterOp);
			}
		};
	};
	Raphael.fn.filterRemove = function(filter) {
		this.node.style.filter = null; // TODO: test
	};
	Raphael._filterOpCounter = 0;

	Raphael.fn.filterAddOperation = function(filter, filterOperation) {
		var paper = this;
		var filterEl = paper._filters[filter.filterId];
		var opEl = filterOperation.appendToFilterEl(filterEl);
		if (opEl) {
			Raphael._filterOpCounter++;
			var opId = "svgfilterop" + Raphael._filterOpCounter;
			opEl.setAttribute("id", opId);
			filterOperation.filterOperationId = opId;
		}
		filterOperation.filter = filter;
	};
	Raphael.fn.filterRemoveOperation = function(filter, filterOperation) {
		var paper = this;
		var filterEl = paper._filters[filter.filterId];
		for ( var i = 0; i < filterEl.childNodes.length; i++) {
			var child = filterEl.childNodes[i];
			if (child.getAttribute("id") == filterOperation.filterOperationId)
				filterEl.removeChild(child);
		}
	};
	/**
	 * installs a filter to this shape.
	 */
	Raphael.el.filterInstall = function(filter) {
		$(this.node, {
			filter : "url(#" + filter.filterId + ")"
		});
	};
	/**
	 * removes the filter from the shape. TODO: warning this removes all filters
	 */
	Raphael.el.filterUninstall = function(filter) {
		$(this.node, {
			filter : ""
		});
	};

	// now filter operations definitions

	Raphael.filterOps = {};

	/**
	 * a general svg filter applicator function - usable by attribute-only
	 * filters
	 */
	Raphael.filterOps.svgFilter = function(filterName, params) {
		// params._filterName = filterName;
		return {
			"params" : params,
			appendToFilterEl : function(filterEl) {
				var filterOpEl = $(filterName);
				for ( var i in this.params) {
					try {
						filterOpEl.setAttribute(i, this.params[i]);
					} catch (ex) {
						alert("invalid parameter " + i + " value: "
								+ this.params[i] + ". Error: " + ex);
					}
				}
				filterEl.appendChild(filterOpEl);
				return filterOpEl;
			}
		};
	};

	/**
	 * feGaussianBlur-
	 * http://www.w3.org/TR/SVG/filters.html#feGaussianBlurElement This filter
	 * primitive performs a Gaussian blur on the input image.
	 * 
	 * The Gaussian blur kernel is an approximation of the normalized
	 * convolution
	 * 
	 * @param params -
	 *            concrete params: stdDeviation - an array with one or two
	 *            numbers. The standard deviation for the blur operation. If two
	 *            <number>s are provided, the first number represents a standard
	 *            deviation value along the x-axis of the coordinate system
	 *            established by attribute ‘primitiveUnits’ on the ‘filter’
	 *            element. The second value represents a standard deviation in
	 *            Y. If one number is provided, then that value is used for both
	 *            X and Y. A negative value is an error (see Error processing).
	 *            A value of zero disables the effect of the given filter
	 *            primitive (i.e., the result is the filter input image). If
	 *            ‘stdDeviation’ is 0 in only one of X or Y, then the effect is
	 *            that the blur is only applied in the direction that has a
	 *            non-zero value. If the attribute is not specified, then the
	 *            effect is as if a value of 0 were specified.
	 * 
	 * 
	 * svg example: <filter id="MyFilter" filterUnits="userSpaceOnUse" x="0"
	 * y="0" width="200" height="120"> <feGaussianBlur in="SourceAlpha"
	 * stdDeviation="4" result="blur"/>
	 * 
	 */
	Raphael.filterOps.feGaussianBlur = function(params) {
		return Raphael.filterOps.svgFilter("feGaussianBlur", params);
	};

	/**
	 * feColorMatrix -
	 * http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
	 * 
	 * concrete parameters:
	 * 
	 * type - "matrix | saturate | hueRotate | luminanceToAlpha". Indicates the
	 * type of matrix operation. The keyword 'matrix' indicates that a full 5x4
	 * matrix of values will be provided. The other keywords represent
	 * convenience shortcuts to allow commonly used color operations to be
	 * performed without specifying a complete matrix. If attribute ‘type’ is
	 * not specified, then the effect is as if a value of matrix were specified.
	 * 
	 * values an array of numbers - The contents of ‘values’ depends on the
	 * value of attribute ‘type’:
	 * 
	 */
	Raphael.filterOps.feColorMatrix = function(params) {
		return Raphael.filterOps.svgFilter("feColorMatrix", params);
	};

	/**
	 * feComponentTransferElement -
	 * @see http://www.w3.org/TR/SVG/filters.html#feComponentTransferElement
	 * 
	 * @param params -
	 *            an object with the format {funcR: {‘type’, ‘tableValues’,
	 *            ‘slope’, ‘intercept’, ‘amplitude’, ‘exponent’, ‘offset’},
	 *            funcG: {the same}, funcB: {the same}, funcA: {the same}}
	 */
	Raphael.filterOps.feComponentTransfer = function(params) {
		return {
			"params" : params,
			appendToFilterEl : function(filterEl) {
				var filterOpEl = $("feComponentTransfer");
				for ( var funcName in this.params) {
					var el = $(funcName);
					for ( var i in this.params[funcName]) {
						el.setAttribute(i, this.params[funcName][i]);
					}
					filterOpEl.appendChild(el);
				}
				filterEl.appendChild(filterOpEl);
				return filterOpEl;
			}
		};
	};

	/**
	 * feConvolveMatrixElement -
	 * http://www.w3.org/TR/SVG/filters.html#feConvolveMatrixElement
	 * 
	 * @param params -
	 *            an object with all the transformation parameters. The params
	 *            object will be modified. Concrete feConvolveMatrix parameters
	 *            are:
	 * 
	 * mandatory parameters: order, kernelMatrix and bias, for example:
	 * 
	 * var cmop1 = {order: 3, kernelMatrix: [0, 1, 1, -1, 0, 1, -1, -1,
	 * 0].join(" "), bias: 1}, cm1 = Raphael.filterOps.feConvolveMatrix(cmop1);
	 * filter1.appendOperation(cm1);
	 * 
	 * @param order -
	 *            an array of 1 or 2 numbers - Indicates the number of cells in
	 *            each dimension for ‘kernelMatrix’. The values provided must be
	 *            <integer>s greater than zero. The first number, <orderX>,
	 *            indicates the number of columns in the matrix. The second
	 *            number, <orderY>, indicates the number of rows in the matrix.
	 *            If <orderY> is not provided, it defaults to <orderX>. A
	 *            typical value is order="3". It is recommended that only small
	 *            values (e.g., 3) be used; higher values may result in very
	 *            high CPU overhead and usually do not produce results that
	 *            justify the impact on performance. If the attribute is not
	 *            specified, the effect is as if a value of 3 were specified.
	 * 
	 * @param kernelMatrix
	 *            array of numbers - The list of <number>s that make up the
	 *            kernel matrix for the convolution. Values are separated by
	 *            space characters and/or a comma. The number of entries in the
	 *            list must equal <orderX> times <orderY>.
	 * 
	 * @param divisor -
	 *            number After applying the ‘kernelMatrix’ to the input image to
	 *            yield a number, that number is divided by ‘divisor’ to yield
	 *            the final destination color value. A divisor that is the sum
	 *            of all the matrix values tends to have an evening effect on
	 *            the overall color intensity of the result. It is an error to
	 *            specify a divisor of zero. The default value is the sum of all
	 *            values in kernelMatrix, with the exception that if the sum is
	 *            zero, then the divisor is set to 1.
	 * 
	 * bias - a number After applying the ‘kernelMatrix’ to the input image to
	 * yield a number and applying the ‘divisor’, the ‘bias’ attribute is added
	 * to each component. One application of ‘bias’ is when it is desirable to
	 * have .5 gray value be the zero response of the filter. The bias property
	 * shifts the range of the filter. This allows representation of values that
	 * would otherwise be clamped to 0 or 1. If ‘bias’ is not specified, then
	 * the effect is as if a value of 0 were specified.
	 * 
	 * targetX - a number - Determines the positioning in X of the convolution
	 * matrix relative to a given target pixel in the input image. The leftmost
	 * column of the matrix is column number zero. The value must be such that:
	 * 0 <= targetX < orderX. By default, the convolution matrix is centered in
	 * X over each pixel of the input image (i.e., targetX = floor ( orderX / 2
	 * )).
	 * 
	 * targetY - a number - Determines the positioning in Y of the convolution
	 * matrix relative to a given target pixel in the input image. The topmost
	 * row of the matrix is row number zero. The value must be such that: 0 <=
	 * targetY < orderY. By default, the convolution matrix is centered in Y
	 * over each pixel of the input image (i.e., targetY = floor ( orderY / 2
	 * )).
	 * 
	 * edgeMode - one of "duplicate | wrap | none" - Determines how to extend
	 * the input image as necessary with color values so that the matrix
	 * operations can be applied when the kernel is positioned at or near the
	 * edge of the input image. "duplicate" indicates that the input image is
	 * extended along each of its borders as necessary by duplicating the color
	 * values at the given edge of the input image.
	 * 
	 * kernelUnitLength - array of 1 or two numbers - The first number is the
	 * <dx> value. The second number is the <dy> value. If the <dy> value is not
	 * specified, it defaults to the same value as <dx>. Indicates the intended
	 * distance in current filter units (i.e., units as determined by the value
	 * of attribute ‘primitiveUnits’) between successive columns and rows,
	 * respectively, in the ‘kernelMatrix’. By specifying value(s) for
	 * ‘kernelUnitLength’, the kernel becomes defined in a scalable, abstract
	 * coordinate system. If ‘kernelUnitLength’ is not specified, the default
	 * value is one pixel in the offscreen bitmap, which is a pixel-based
	 * coordinate system, and thus potentially not scalable. For some level of
	 * consistency across display media and user agents, it is necessary that a
	 * value be provided for at least one of ‘filterRes’ and ‘kernelUnitLength’.
	 * In some implementations, the most consistent results and the fastest
	 * performance will be achieved if the pixel grid of the temporary offscreen
	 * images aligns with the pixel grid of the kernel. A negative or zero value
	 * is an error (see Error processing).
	 * 
	 * preserveAlpha - boolean - A value of false indicates that the convolution
	 * will apply to all channels, including the alpha channel.A value of true
	 * indicates that the convolution will only apply to the color channels. In
	 * this case, the filter will temporarily unpremultiply the color component
	 * values, apply the kernel, and then re-premultiply at the end.If
	 * ‘preserveAlpha’ is not specified, then the effect is as if a value of
	 * false were specified.
	 */
	Raphael.filterOps.feConvolveMatrix = function(params) {
		return Raphael.filterOps.svgFilter("feConvolveMatrix", params);
	};

	/**
	 * This filter primitive performs "fattening" or "thinning" of artwork. It
	 * is particularly useful for fattening or thinning an alpha channel.
	 * 
	 * The dilation (or erosion) kernel is a rectangle with a width of
	 * 2*x-radius and a height of 2*y-radius. In dilation, the output pixel is
	 * the individual component-wise maximum of the corresponding R,G,B,A values
	 * in the input image's kernel rectangle. In erosion, the output pixel is
	 * the individual component-wise minimum of the corresponding R,G,B,A values
	 * in the input image's kernel rectangle.
	 * 
	 * Frequently this operation will take place on alpha-only images, such as
	 * that produced by the built-in input, SourceAlpha. In that case, the
	 * implementation might want to optimize the single channel case.
	 * 
	 * If the input has infinite extent and is constant (e.g FillPaint where the
	 * fill is a solid color), this operation has no effect. If the input has
	 * infinite extent and the filter result is the input to an ‘feTile’, the
	 * filter is evaluated with periodic boundary conditions.
	 * 
	 * Because ‘feMorphology’ operates on premultipied color values, it will
	 * always result in color values less than or equal to the alpha channel.
	 * 
	 * @param operator =
	 *            "erode | dilate" A keyword indicating whether to erode (i.e.,
	 *            thin) or dilate (fatten) the source graphic. If attribute
	 *            ‘operator’ is not specified, then the effect is as if a value
	 *            of erode were specified.
	 * 
	 * @param radius = "
	 *            <number-optional-number>" The radius (or radii) for the
	 *            operation. If two <number>s are provided, the first number
	 *            represents a x-radius and the second value represents a
	 *            y-radius. If one number is provided, then that value is used
	 *            for both X and Y. The values are in the coordinate system
	 *            established by attribute ‘primitiveUnits’ on the ‘filter’
	 *            element. A negative value is an error (see Error processing).
	 *            A value of zero disables the effect of the given filter
	 *            primitive (i.e., the result is a transparent black image). If
	 *            the attribute is not specified, then the effect is as if a
	 *            value of 0 were specified.
	 */
	Raphael.filterOps.feMorphology = function(params) {
		return Raphael.filterOps.svgFilter("feMorphology", params);
	};

	/**
	 * http://www.w3.org/TR/SVG/filters.html#feTurbulenceElement
	 * 
	 * This filter primitive creates an image using the Perlin turbulence
	 * function. It allows the synthesis of artificial textures like clouds or
	 * marble. For a detailed description the of the Perlin turbulence function,
	 * see "Texturing and Modeling", Ebert et al, AP Professional, 1994. The
	 * resulting image will fill the entire filter primitive subregion for this
	 * filter primitive.
	 * 
	 * It is possible to create bandwidth-limited noise by synthesizing only one
	 * octave.
	 * 
	 * The C code below shows the exact algorithm used for this filter effect.
	 * 
	 * For fractalSum, you get a turbFunctionResult that is aimed at a range of
	 * -1 to 1 (the actual result might exceed this range in some cases). To
	 * convert to a color value, use the formula colorValue =
	 * ((turbFunctionResult * 255) + 255) / 2, then clamp to the range 0 to 255.
	 * 
	 * For turbulence, you get a turbFunctionResult that is aimed at a range of
	 * 0 to 1 (the actual result might exceed this range in some cases). To
	 * convert to a color value, use the formula colorValue =
	 * (turbFunctionResult * 255), then clamp to the range 0 to 255.
	 * 
	 * The following order is used for applying the pseudo random numbers. An
	 * initial seed value is computed based on attribute ‘seed’. Then the
	 * implementation computes the lattice points for R, then continues getting
	 * additional pseudo random numbers relative to the last generated pseudo
	 * random number and computes the lattice points for G, and so on for B and
	 * A.
	 * 
	 * The generated color and alpha values are in the color space determined by
	 * the value of property ‘color-interpolation-filters’:
	 * 
	 * 
	 * @param baseFrequency = "
	 *            <number-optional-number>" The base frequency (frequencies)
	 *            parameter(s) for the noise function. If two <number>s are
	 *            provided, the first number represents a base frequency in the
	 *            X direction and the second value represents a base frequency
	 *            in the Y direction. If one number is provided, then that value
	 *            is used for both X and Y. A negative value for base frequency
	 *            is an error (see Error processing). If the attribute is not
	 *            specified, then the effect is as if a value of 0 were
	 *            specified.
	 * 
	 * @param numOctaves = "
	 *            <integer>" The numOctaves parameter for the noise function. If
	 *            the attribute is not specified, then the effect is as if a
	 *            value of 1 were specified.
	 * 
	 * @param seed = "
	 *            <number>" The starting number for the pseudo random number
	 *            generator. If the attribute is not specified, then the effect
	 *            is as if a value of 0 were specified. When the seed number is
	 *            handed over to the algorithm above it must first be truncated,
	 *            i.e. rounded to the closest integer value towards zero.
	 * 
	 * @param stitchTiles =
	 *            "stitch | noStitch" If stitchTiles="noStitch", no attempt it
	 *            made to achieve smooth transitions at the border of tiles
	 *            which contain a turbulence function. Sometimes the result will
	 *            show clear discontinuities at the tile borders. If
	 *            stitchTiles="stitch", then the user agent will automatically
	 *            adjust baseFrequency-x and baseFrequency-y values such that
	 *            the feTurbulence node's width and height (i.e., the width and
	 *            height of the current subregion) contains an integral number
	 *            of the Perlin tile width and height for the first octave. The
	 *            baseFrequency will be adjusted up or down depending on which
	 *            way has the smallest relative (not absolute) change as
	 *            follows: Given the frequency, calculate
	 *            lowFreq=floor(width*frequency)/width and
	 *            hiFreq=ceil(width*frequency)/width. If frequency/lowFreq <
	 *            hiFreq/frequency then use lowFreq, else use hiFreq. While
	 *            generating turbulence values, generate lattice vectors as
	 *            normal for Perlin Noise, except for those lattice points that
	 *            lie on the right or bottom edges of the active area (the size
	 *            of the resulting tile). In those cases, copy the lattice
	 *            vector from the opposite edge of the active area. If attribute
	 *            ‘stitchTiles’ is not specified, then the effect is as if a
	 *            value of noStitch were specified.
	 * 
	 * @param type =
	 *            "fractalNoise | turbulence" Indicates whether the filter
	 *            primitive should perform a noise or turbulence function. If
	 *            attribute ‘type’ is not specified, then the effect is as if a
	 *            value of turbulence were specified.
	 * 
	 * 
	 * 
	 */
	Raphael.filterOps.feTurbulence = function(params) {
		return Raphael.filterOps.svgFilter("feTurbulence", params);
	};

	/**
	 * This filter primitive offsets the input image relative to its current
	 * position in the image space by the specified vector.
	 * 
	 * This is important for effects like drop shadows.
	 * 
	 * When applying this filter, the destination location may be offset by a
	 * fraction of a pixel in device space. In this case a high quality viewer
	 * should make use of appropriate interpolation techniques, for example
	 * bilinear or bicubic. This is especially recommended for dynamic viewers
	 * where this interpolation provides visually smoother movement of images.
	 * For static viewers this is less of a concern. Close attention should be
	 * made to the ‘image-rendering’ property setting to determine the authors
	 * intent.
	 * 
	 * @param dx = "
	 *            <number>" The amount to offset the input graphic along the
	 *            x-axis. The offset amount is expressed in the coordinate
	 *            system established by attribute ‘primitiveUnits’ on the
	 *            ‘filter’ element. If the attribute is not specified, then the
	 *            effect is as if a value of 0 were specified.
	 * 
	 * @param dy = "
	 *            <number>" The amount to offset the input graphic along the
	 *            y-axis. The offset amount is expressed in the coordinate
	 *            system established by attribute ‘primitiveUnits’ on the
	 *            ‘filter’ element. If the attribute is not specified, then the
	 *            effect is as if a value of 0 were specified.
	 */
	Raphael.filterOps.feOffset = function(params) {
		return Raphael.filterOps.svgFilter("feOffset", params);
	};

	
	Raphael.filterOps.feComposite = function(params) {
		return Raphael.filterOps.svgFilter("feComposite", params);
	};
	
	
	/**
	 * feMerge
	 * @see http://www.w3.org/TR/SVG/filters.html#feMergeElement
	 * 
	 * @param params -
	 *            an array of the ids of filters / sources to merge, for
	 *            example:
	 * 
	 * <pre>
	 * var blur1 = Raphael.filterOps.feGaussianBlur({stdDeviation: "0.5", "in":
	 * "SourceAlpha", result: "blur1"}); 
	 * 
	 * var offset1 = Raphael.filterOps.feOffset({"in": "blur1", dx: 1, dy: 1, result:
	 * "offsetBlur"}); 
	 * 
	 * var merge1 = Raphael.filterOps.feMerge({merge: ["offsetBlur",
	 * "SourceGraphic"]});
	 * </pre>
	 * 
	 * 
	 * This filter primitive composites input image layers on top of each other
	 * using the over operator with Input1 (corresponding to the first
	 * ‘feMergeNode’ child element) on the bottom and the last specified input,
	 * InputN (corresponding to the last ‘feMergeNode’ child element), on top.
	 * 
	 * Many effects produce a number of intermediate layers in order to create
	 * the final output image. This filter allows us to collapse those into a
	 * single image. Although this could be done by using n-1 Composite-filters,
	 * it is more convenient to have this common operation available in this
	 * form, and offers the implementation some additional flexibility.
	 * 
	 * Each ‘feMerge’ element can have any number of ‘feMergeNode’ subelements,
	 * each of which has an ‘in’ attribute.
	 * 
	 * The canonical implementation of feMerge is to render the entire effect
	 * into one RGBA layer, and then render the resulting layer on the output
	 * device. In certain cases (in particular if the output device itself is a
	 * continuous tone device), and since merging is associative, it might be a
	 * sufficient approximation to evaluate the effect one layer at a time and
	 * render each layer individually onto the output device bottom to top.
	 * 
	 * If the topmost image input is SourceGraphic and this ‘feMerge’ is the
	 * last filter primitive in the filter, the implementation is encouraged to
	 * render the layers up to that point, and then render the SourceGraphic
	 * directly from its vector description on top.
	 * 
	 * 
	 */
	Raphael.filterOps.feMerge = function(params) {
		return {
			"params" : params,
			appendToFilterEl : function(filterEl) {
				var filterOpEl = $("feMerge");
				if(this.params.merge) for ( var i = 0; i < this.params.merge.length; i++) {
					var node = $("feMergeNode");
					node.setAttribute("in", this.params.merge[i]);
					filterOpEl.appendChild(node);
				}
				filterEl.appendChild(filterOpEl);
				return filterOpEl;
			}
		};
	};

	
	
	/**
	 * feSpecularLighting -
	 * 
	 * params should be something like:
	 *  
	 * <pre>
	 * params = {specularExponent: 25, "lightning-color": "white", 
	 * 	lightSource: {lightSourceName: "fePointLight", x: 400, y: 100, z: 100}
	 * }</pre>
	 * 
	 * @see http://www.w3.org/TR/SVG/filters.html#feSpecularLightingElement
	 * 
	 * @param surfaceScale = "
	 *            <number>" height of surface when Ain = 1. If the attribute is
	 *            not specified, then the effect is as if a value of 1 were
	 *            specified.
	 * 
	 * @param specularConstant = "
	 *            <number>" ks in Phong lighting model. In SVG, this can be any
	 *            non-negative number. If the attribute is not specified, then
	 *            the effect is as if a value of 1 were specified.
	 * 
	 * @param specularExponent = "
	 *            <number>" Exponent for specular term, larger is more "shiny".
	 *            Range 1.0 to 128.0. If the attribute is not specified, then
	 *            the effect is as if a value of 1 were specified.
	 * 
	 * @param kernelUnitLength = "
	 *            <number-optional-number>" The first number is the <dx> value.
	 *            The second number is the <dy> value. If the <dy> value is not
	 *            specified, it defaults to the same value as <dx>. Indicates
	 *            the intended distance in current filter units (i.e., units as
	 *            determined by the value of attribute ‘primitiveUnits’) for dx
	 *            and dy, respectively, in the surface normal calculation
	 *            formulas. By specifying value(s) for ‘kernelUnitLength’, the
	 *            kernel becomes defined in a scalable, abstract coordinate
	 *            system. If ‘kernelUnitLength’ is not specified, the dx and dy
	 *            values should represent very small deltas relative to a given
	 *            (x,y) position, which might be implemented in some cases as
	 *            one pixel in the intermediate image offscreen bitmap, which is
	 *            a pixel-based coordinate system, and thus potentially not
	 *            scalable. For some level of consistency across display media
	 *            and user agents, it is necessary that a value be provided for
	 *            at least one of ‘filterRes’ and ‘kernelUnitLength’. Discussion
	 *            of intermediate images are in the Introduction and in the
	 *            description of attribute ‘filterRes’. A negative or zero value
	 *            is an error.
	 */
	Raphael.filterOps.feSpecularLighting = function(params) {
		return {
			"params" : params,
			appendToFilterEl : function(filterEl) {
				var filterOpEl = $("feSpecularLighting");
				for(var i in this.params)
					if(i!="lightSource") 
						filterOpEl.setAttribute(i, this.params[i]); 
					
				if(this.params.lightSource && this.params.lightSource.lightSourceName) {
					var el = $(this.params.lightSource.lightSourceName);
					for(var i in this.params.lightSource) 
						if(i!="lightSourceName")
							el.setAttribute(i, this.params.lightSource[i]); 
					filterOpEl.appendChild(el);
				}
				filterEl.appendChild(filterOpEl);
				return filterOpEl;
			}
		};
	};

	
	
	/**
	 * feDiffuseLighting 
	 * @see http://www.w3.org/TR/SVG/filters.html#feDiffuseLightingElement
	 * 
	 * params should be something like:
	 *  
	 * <pre>
	 * params = {diffuseConstant: 2, "lightning-color": "white", 
	 * 	lightSource: {lightSourceName: "fePointLight", x: 400, y: 100, z: 100}
	 * }</pre>
	 * 
	 * 
	 * @param surfaceScale = "
	 *            <number>" height of surface when Ain = 1. If the attribute is
	 *            not specified, then the effect is as if a value of 1 were
	 *            specified.
	 * 
	 * @param diffuseConstant = "
	 *            <number>" ks in Phong lighting model. In SVG, this can be any
	 *            non-negative number. If the attribute is not specified, then
	 *            the effect is as if a value of 1 were specified.
	 * 
	 * @param kernelUnitLength = "
	 *            <number-optional-number>" The first number is the <dx> value.
	 *            The second number is the <dy> value. If the <dy> value is not
	 *            specified, it defaults to the same value as <dx>. Indicates
	 *            the intended distance in current filter units (i.e., units as
	 *            determined by the value of attribute ‘primitiveUnits’) for dx
	 *            and dy, respectively, in the surface normal calculation
	 *            formulas. By specifying value(s) for ‘kernelUnitLength’, the
	 *            kernel becomes defined in a scalable, abstract coordinate
	 *            system. If ‘kernelUnitLength’ is not specified, the dx and dy
	 *            values should represent very small deltas relative to a given
	 *            (x,y) position, which might be implemented in some cases as
	 *            one pixel in the intermediate image offscreen bitmap, which is
	 *            a pixel-based coordinate system, and thus potentially not
	 *            scalable. For some level of consistency across display media
	 *            and user agents, it is necessary that a value be provided for
	 *            at least one of ‘filterRes’ and ‘kernelUnitLength’. Discussion
	 *            of intermediate images are in the Introduction and in the
	 *            description of attribute ‘filterRes’. A negative or zero value
	 *            is an error.
	 */
	Raphael.filterOps.feDiffuseLighting = function(params) {
		return {
			"params" : params,
			appendToFilterEl : function(filterEl) {
				var filterOpEl = $("feDiffuseLighting");
				for(var i in this.params)
					if(i!="lightSource") 
						filterOpEl.setAttribute(i, this.params[i]); 
					
				if(this.params.lightSource && this.params.lightSource.lightSourceName) {
					var el = $(this.params.lightSource.lightSourceName);
					for(var i in this.params.lightSource) 
						if(i!="lightSourceName")
							el.setAttribute(i, this.params.lightSource[i]); 
					filterOpEl.appendChild(el);
				}
				filterEl.appendChild(filterOpEl);
				return filterOpEl;
			}
		};
	};
	
	
	// /**
	// * feBlend http://www.w3.org/TR/SVG/filters.html#feBlendElement
	// *
	// * @param mode "normal | multiply | screen | darken | lighten".
	// * One of the image blending modes (see table below). If attribute ‘mode’
	// is not specified, then the effect is as if a value of normal were
	// specified.
	// *
	// * @param input1 - the first input image to the blending operation.
	// *
	// * @param input2 The second input image to the blending operation. This
	// attribute can take on the same values as the ‘in’ attribute.
	// *
	// */
	// Raphael.filterOps.feBlend = function(mode, input1, input2) {
	// return Raphael.filterOps.svgFilter("feBlend", {"mode": mode, "in":
	// input1, "in2": input2});
	// };

	// /**
	// * feDistantLightElement -
	// http://www.w3.org/TR/SVG/filters.html#feDistantLightElement
	// *
	// * @param azimut Direction angle for the light source on the XY plane
	// (clockwise), in degrees from the x axis.
	// * If the attribute is not specified, then the effect is as if a value of
	// 0 were specified.
	// *
	// * @param elevation Direction angle for the light source from the XY plane
	// towards the z axis, in degrees. Note the positive Z-axis points towards
	// the viewer of the content.
	// * If the attribute is not specified, then the effect is as if a value of
	// 0 were specified.
	// */
	// Raphael.filterOps.feDistantLight = function(azimuth, elevation) {
	// return Raphael.filterOps.svgFilter("feDistantLight", {"azimuth": azimuth,
	// "elevation": elevation});
	// };

})(); // end of extension
