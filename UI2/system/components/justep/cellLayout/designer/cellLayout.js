/*! 
* WeX5 v3 (htttp://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	require('css!./css/cellLayout').load();
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	function insertface(txtarea, tag) {
		// IE
		if (document.selection) {
			var theSelection = document.selection.createRange().text;
			if (!theSelection) {
				theSelection = tag;
			}
			txtarea.focus();
			if (theSelection.charAt(theSelection.length - 1) == " ") {
				theSelection = theSelection.substring(0, theSelection.length - 1);
				document.selection.createRange().text = theSelection + " ";
			} else {
				document.selection.createRange().text = theSelection;
			}

		}
		// Mozilla
		else if (txtarea.selectionStart || txtarea.selectionStart == '0') {
			var startPos = txtarea.selectionStart;
			var endPos = txtarea.selectionEnd;
			var myText = (txtarea.value).substring(startPos, endPos);
			var subst;
			if (!myText) {
				myText = tag;
			}
			if (myText.charAt(myText.length - 1) == " ") { // exclude ending
				// space char, if
				// any
				subst = myText.substring(0, (myText.length - 1)) + " ";
			} else {
				subst = myText;
			}
			txtarea.value = txtarea.value.substring(0, startPos) + subst + txtarea.value.substring(endPos, txtarea.value.length);
			txtarea.focus();
			var cPos = startPos + (myText.length);
			txtarea.selectionStart = cPos;
			txtarea.selectionEnd = cPos;

		}
		// All others
		else {
			txtarea.value += tag;
			txtarea.focus();
		}
		if (txtarea.createTextRange)
			txtarea.caretPos = document.selection.createRange().duplicate();
	}

	var SelectionUnit = function(ownerCom) {
		this.ownerCom = ownerCom;
	};

	String.prototype.replaceAll = function(s1, s2) {
		return this.replace(new RegExp(s1, "gm"), s2);
	};

	SelectionUnit.prototype = {
		setBound : function(bound) {
			this.bound = bound;
			var pe = this.ownerCom.domNode;
			var l = bound.x, t = bound.y, w = bound.w - 1, h = bound.h - 1;

			if (!this.lines) {
				var color = "black";
				var borderType = "solid";
				var commonStyle = ";overflow:visible;font-size:0px;z-index:2200;position:absolute;";
				var styles = [];// l,t,r,b

				styles.push("top:" + t + "px;left:" + l + "px;width:1px;height:" + h + "px;line-height:0px;" + ";border-left:2px " + borderType + " " + color + commonStyle);// left

				styles.push("top:" + t + "px;left:" + l + "px;width:" + w + "px;height:1px;line-height:0px;" + ";border-top:2px " + borderType + " " + color + commonStyle);// top

				styles.push("top:" + (t) + "px;left:" + (l + w) + "px;width:1px;height:" + (h + 1) + "px;line-height:0px;" + ";border-left:2px " + borderType + " " + color + commonStyle);

				styles.push("top:" + (t + h) + "px;left:" + l + "px;width:" + w + "px;height:1px;line-height:0px;" + ";border-top:2px " + borderType + " " + color + commonStyle);
				this.lines = [];
				var i = 0;
				for (i = 0, l = styles.length; i < l; i++) {
					this.lines.push(this._paintLine(pe, styles[i]));
				}
			} else {
				$(this.lines[0]).css({
					top : t + "px",
					left : l + "px",
					height : h + "px"
				});
				$(this.lines[1]).css({
					top : t + "px",
					left : l + "px",
					width : w + "px"
				});
				$(this.lines[2]).css({
					top : t + "px",
					left : (l + w) + "px",
					height : (h + 2) + "px"
				});
				$(this.lines[3]).css({
					top : (t + h) + "px",
					left : l + "px",
					width : w + "px"
				});
			}
			// var x1 = bound.x - 2, x2 = bound.x + bound.w - 2;
			// this.startIndics = this.ownerCom.getRowColIndex(bound.x + 1,
			// bound.y + 1);
			// this.endIndics = this.ownerCom.getRowColIndex(bound.x + bound.w -
			// 3, bound.y + bound.h - 3);
			this.cells = this.getCells();

			return this;
		},

		reGetCells : function() {
			this.cells = this.getCells();
		},

		updateBound : function() {
			var startCell = this.cells[0];
			var endCell = this.cells[this.cells.length - 1];
			var bound1 = this.ownerCom.getCellBound(startCell);
			var bound2 = this.ownerCom.getCellBound(endCell);
			var x = bound1.x, y = bound1.y, w = bound2.x - bound1.x + bound2.w, h = bound2.y - bound1.y + bound2.h;
			this.setBound({
				x : x,
				y : y,
				w : w,
				h : h
			});
		},

		_paintLine : function(pe, cssText, isExsit) {
			var line = document.createElement("div");
			pe.appendChild(line);
			line.className = "cell-select-line";
			line.style.cssText = cssText;
			return line;
		},

		getCells : function() {
			return this.getCellsWithColRowIndics()[2];
		},

		getCellsWithColRowIndics : function() {
			var bound = this.getBound();
			var x1 = bound.x - 2, x2 = bound.x + bound.w - 2;
			var startIndics = this.ownerCom.getRowColIndex(bound.x + 1, bound.y + 1);
			var endIndics = this.ownerCom.getRowColIndex(bound.x + bound.w - 3, bound.y + bound.h - 3);
			var cellArray = this.ownerCom.getCells(startIndics[0], endIndics[0] - 1, x1, x2);
			return [ startIndics, endIndics, cellArray ];
		},

		getBound : function() {
			return this.bound;
		},

		dispose : function() {
			if (this.lines) {
				for ( var i = 0, l = this.lines.length; i < l; i++) {
					this.lines[i].parentNode.removeChild(this.lines[i]);
				}
			}
			this.lines = null;
		}
	};

	var CellLayout = function(config) {
		this.selctionChangeCaller = null;
		this.selectionClearCaller = null;
		this.selections = [];
		this.preAddChild = {};
		this.maxPos = {
			x : 0,
			y : 0
		};

		this.domNode = this.templateNode = config.templateNode;
		this.domNode.setAttribute("tabindex", '0');
		this.paintContent(this.templateNode);
	};

	CellLayout.prototype = {
		paintContent : function(xmlNode) {
			var self = this;
			$(this.domNode).on("childChanged",">*",function(){
				setTimeout(function(){
					self.updateAllSelectionUnitBound();
				},100)
			});
			$(this.domNode).on("childChanged",function(){
				setTimeout(function(){
					self.updateAllSelectionUnitBound();
				},100)
			});
			this.isInit = true;
			this.rowHeight = xmlNode.getAttribute("row-height");
			this.columnWidth = xmlNode.getAttribute("column-width");
			if (!this.rowHeight || this.rowHeight == "0") {
				this.rowHeight = "19";
			}
			if (!this.columnWidth || this.columnWidth == "0") {
				this.columnWidth = "80";
			}
			this.rowHeight += "px";
			this.columnWidth += "px";
			var childNodes = xmlNode.childNodes;
			var layoutData;
			var comMap = {};
			for ( var i = 0, l = childNodes.length; i < l; i++) {
				var node = childNodes[i];
				if (node.tagName.toLowerCase() == 'layout-content') {
					var nodes = node.childNodes;
					var buf = [];
					for ( var j = 0; j < nodes.length; j++) {
						if (nodes[j].nodeType == 3) {
							buf.push(nodes[j].nodeValue);
						}
					}
					layoutData = $(buf.join(""))[0];
					// tableXmlData = tableXmlData.firstChild;
				} else if (node.nodeType === 1) {
					comMap[node.getAttribute("xid")] = node.outerHTML;
				}
			}

			this._init(layoutData, comMap);
			this.isInit = false;

			var maxRowCol = this.getMaxRowColIndex();
			this.updateBeforeCellsHeight(maxRowCol[0], maxRowCol[1]);
		},

		_init : function(layoutData, comMap) {
			var self = this;
			var html = this._buildHtml(layoutData, comMap);
			this.domNode.innerHTML = html;
			// $("<input
			// style='position:absolute;top:-100px;'>").appendTo(this.domNode);
			this.mainTable = this.domNode.childNodes[0];

			var isDragSelect = false;
			var mouseDownCell, mousedownX, mousedownY;
			$(this.domNode).bind("mousedown", function(event) {
				mousedownX = event.clientX;
				mousedownY = event.clientY;
				if (self.ownerDesigner.ctx.action !== null) {
					return;
				}
				var targetE = event.target;
				var jTarget = $(event.target);
				if (jTarget.hasClass('cell')) {
					if (event.button == 2 && self.getSelectionUnit(event.target)) {
						event.stopPropagation();
						return;
					}
					if (targetE.getAttribute('d_canAddChild') != 'true') {
						self.clearSelectionUnit();
						return;
					}
					self.mouseDonwCell = targetE;
					self.ownerDesigner.clearSelections();
					self.ownerDesigner.clearResizeBoxes();
					self.executeSelect(event, targetE);
					self.currentCell = targetE;
					mouseDownCell = targetE;

					// 记录用户左右键移动时的当前行号，当离开合并单元格时，回到用户期望的行
					self.moveRowIndex = mouseDownCell.parentNode.rowIndex;
					event.stopPropagation();
					self.ownerDesigner.clearCompTip();
				}
			}).bind('mouseup', function(event) {
				isDragSelect = false;
				mouseDownCell = null;
				var jTarget = $(event.target);

				if (self.ownerDesigner.ctx.action === null && (jTarget.hasClass('cell') || jTarget.hasClass("cell-select-line"))) {
					if (event.button == 2) {
						self.ownerDesigner.dispatchEvent({
							event : "contextmenu",
							selections : JSON.stringify([ self.domNode.getAttribute("d_id") ]),
							componentNames : JSON.stringify([ self.domNode.getAttribute("componentName") ])
						});
					}
				}
			}).bind('mousemove', function(event) {
				if (!isDragSelect && mouseDownCell && (Math.abs(event.clientX - mousedownX) > 1 || Math.abs(event.clientY - mousedownY) > 1)) {
					isDragSelect = true;
					self.dragSelect(event, mouseDownCell, self);
				}
			}).bind('dblclick', function(event) {
				var targetE = event.target;
				if (targetE.tagName == 'TD' && $(targetE).hasClass('cell') && targetE.getAttribute('d_canAddChild') == 'true') {
					// self.clearSelectionUnit();
					var childNodes = targetE.childNodes;
					for ( var i = 0; i < childNodes.length; i += 1) {
						if (childNodes[i].nodeType == 1 && childNodes[i].tagName != 'BR') {
							return;
						}
					}
					self.ownerDesigner.focusable = false;
					self.showLabelInput(targetE);
					setTimeout(function() {
						self.ownerDesigner.focusable = true;
					}, 800);
				}
				// event.stopPropagation();
			}).bind('keydown', function(event) {
				if (!self.currentCell) {
					return;
				}
				var keyCode = event.keyCode;
				if (keyCode == 37) {//
					self.gotoPrevTd(self.currentCell, event.shiftKey);
					return false;
				} else if (keyCode == 39 || keyCode == 9) {
					if (keyCode == 9 && event.shiftKey) {
						self.gotoPrevTd(self.currentCell, false);
					} else {
						self.gotoNextTd(self.currentCell, event.shiftKey);
					}
					return false;
				} else if (keyCode == 38) {
					self.gotoUpTd(self.currentCell, event.shiftKey);
					return false;
				} else if (keyCode == 40 || keyCode == 13) {
					if (keyCode == 13 && event.shiftKey) {
						self.gotoUpTd(self.currentCell, false);
					} else {
						self.gotoDownTd(self.currentCell, event.shiftKey);
						return false;
					}
				} else if (keyCode == 32 || keyCode == 113) {
					self.showLabelInput(self.lastSelectCell);
					event.preventDefault();
				} else if (keyCode == 46) {// 删除
					event.stopPropagation();
					self.clearCellContent();
				} else if (event.ctrlKey && (event.keyCode == 67 || event.keyCode == 88)) { // copy
					// cut

					// event.stopPropagation();//TODO:暂时不支持复制和剪切
					// return false;
				} else if (keyCode == 27) {// Esc
					if (self.selections && self.selections.length > 0) {
						self.clearSelectionUnit();
						self.ownerDesigner.setSelection(self.domNode);
						self.ownerDesigner.dispatchSelectionChangedEvent();
						return false;
					}

				}
			});
		},

		endCellEdit : function() {
			if (this.currentTextInput) {
				this.currentTextInput.blur();
			}
		},

		/** 复制单元格以及其内容 * */
		copyCells : function(config) {
			if (this.selections.length > 1) {
				alert("不能同时复制多个区域");
				return;
			} else if (this.selections.length == 1) {
				var rows = {};
				var cellData = this.selections[0].getCellsWithColRowIndics();
				var startIndics = cellData[0];
				var endIndics = cellData[1];
				var colNums = endIndics[1] - startIndics[1];
				var rowNums = endIndics[0] - startIndics[0];
				var cells = cellData[2];
				var comIds = [], paths = [];
				for ( var i = 0, l = cells.length; i < l; i++) {
					var cell = cells[i];
					this.getComIds(cell, comIds, paths);
					var row = rows[cell.parentNode.rowIndex];
					if (!row) {
						row = rows[cell.parentNode.rowIndex] = [];
					}
					row.push(this.genaCellHtml(cell));
				}
				var copyDataPacket = [ "<table rowNums=\"" + rowNums + "\" colNums=\"" + colNums + "\">" ];
				for ( var p in rows) {
					copyDataPacket.push("<tr>" + rows[p].join("") + "</tr>");
				}
				copyDataPacket.push("</table>");
				config.cellData = copyDataPacket.join("");
				config.comIds = comIds;
				config.paths = paths;
			}
		},

		/** 把其他单元格中内容粘贴到当前选择的单元格中* */
		pasteCells : function(config) {

			var cellXml = config.cells;
			if (cellXml) {
				cellXml = cellXml.replace(new RegExp("#C1C1C1|#c1c1c1", "gm"), "#010101");

				var selectedCells = this.selections[0].getCells();
				var firstCell = selectedCells[0];
				var cellData = $(cellXml)[0];

				var rowNums = parseInt(cellData.getAttribute("rowNums"), 10);
				var colNums = parseInt(cellData.getAttribute("colNums"), 10);

				var startRowIdx = firstCell.parentNode.rowIndex;// 开始行索引
				var startColIndex = this.getColIndex(firstCell);// 开始列索引
				var endRowIndex = startRowIdx + rowNums - 1; // 结束的行索引
				var endColIndex = startColIndex + colNums - 1; // 结束的列索引

				var startCell = this.mainTable.rows[0].cells[startColIndex];
				var endColCell = this.mainTable.rows[0].cells[endColIndex];
				if (!endColCell) {
					alert("列数不足！");
					return;
				}
				var endRow = this.mainTable.rows[endRowIndex];
				if (!endRow) {
					alert("行数不足！");
					return;
				}
				var endRowCell = endRow.cells[0];

				var minX = startCell.offsetLeft;// 最小横坐标
				var minY = startCell.offsetTop; // 最先纵坐标
				var maxX = endColCell.offsetLeft + endColCell.offsetWidth;
				var maxY = endRowCell.offsetTop + endRowCell.offsetHeight;

				var x1 = 50000, y1 = 50000, x2 = 0, y2 = 0;
				var msg = "";
				var targetCells = this.getCells(startRowIdx, endRowIndex, minX, maxX);

				var lastCell = null;
				for ( var i = 0; i < targetCells.length; i++) {
					var cell = targetCells[i];
					var left = cell.offsetLeft;
					var top = cell.offsetTop;
					var left1 = cell.offsetWidth + left;
					var top1 = cell.offsetHeight + top;
					x1 = Math.min(x1, left);
					y1 = Math.min(y1, top);
					x2 = Math.max(left1, x2);
					y2 = Math.max(top1, y2);
					if (!msg && (left < minX || top < minY || (cell.offsetWidth + left) > maxX || (cell.offsetHeight + top) > maxY)) {
						msg = "不能对合并单元格做部分修改！";
					}
					lastCell = cell;
				}

				if (lastCell != firstCell) {
					// 更新选择框的范围
					this.selections[this.selections.length - 1].setBound({
						x : x1,
						y : y1,
						w : x2 - x1,
						h : y2 - y1
					});
					this.paintResizeBoxes(lastCell, true);
				}

				if (msg) {
					alert(msg);
					return;
				}
				this.cancelCellMerging(false);

				selectedCells = this.selections[0].getCells();
				var rows = [];
				var currentRowNums = 0;
				startRowIdx = -1;
				var i = 0;
				for ( i = 0; i < selectedCells.length; i++) {
					var cell = selectedCells[i];
					if (startRowIdx == -1) {
						startRowIdx = cell.parentNode.rowIndex;
					}
					var row = rows[cell.parentNode.rowIndex - startRowIdx];
					if (!row) {
						currentRowNums += 1;
						row = rows[cell.parentNode.rowIndex - startRowIdx] = [];
					}
					row.push(cell);
				}
				var firstRow = rows[0];
				if (currentRowNums != rowNums || firstRow.length != colNums) {
					alert("不能对合并单元格做部分修改！");
					return;
				}

				var childNodes = cellData.childNodes[0].childNodes;
				this.comIdToCellMap = {};
				for ( i = 0; i < childNodes.length; i++) {
					var row = childNodes[i];
					var cells = row.childNodes;
					for ( var j = 0; j < cells.length; j++) {
						var cell = cells[j];
						if (cell.nodeType == 1) {
							cell.setAttribute("class", "cell");
							cell.setAttribute("d_canAddChild", "true");
							var td = $(cell.outerHTML).insertBefore(rows[i][0])[0];
							td.setAttribute("id", "_id")
						}
					}
				}
				var comIds = [], paths = [];

				for ( i = selectedCells.length - 1; i >= 0; i--) {
					this._fetchComIds(selectedCells[i], comIds, paths);
					selectedCells[i].parentNode.removeChild(selectedCells[i]);
				}
				config.removeComIds = comIds;
				config.removeComPaths = paths;
				var html = this.asHtml();
				config["layout-data"] = html;
				// this.deleteCells(selectedCells);
				this.isInit = true;
				var self = this;
				// var html = this.asHtml();
				this.currentCell = this.selections[0].getCells()[0];

			}
		},

		_buildHtml : function(layoutData, comMap) {
			var tableHtml = [ "<table class='nohead' cellspacing=0 cellpadding=0 d_canAddChild='false' style='background:white;border-collapse: collapse;table-layout:fixed; top:0px;left:0px;width:1px;'>" ];
			var trs = layoutData ? layoutData.getElementsByTagName("tr") : [];
			var rowCount = trs.length;
			var colCount = trs.length > 0 ? trs[0].childNodes.length : 0;
			var maxColIdx = Math.max(8, colCount);
			var maxRowIdx = Math.max(20, rowCount);
			var comIdToCellMap = {};
			for ( var i = 0; i < maxRowIdx; i++) {
				tableHtml.push("<tr d_canAddChild='false'>");
				var cls = "cell";

				if (i == 0) {
					cls += " first-row";
				}
				var tr = trs[i];
				if (!tr) {
					for ( var j = 0; j < maxColIdx; j++) {
						var _cls = cls;
						if (i == 0 && j == 0) {
							_cls += " first-cell";
						}
						tableHtml.push("<td name='" + (i + "-" + j) + "' d_canAddChild='" + ((i > 0 && j > 0) ? "true" : "false") + "' class='" + _cls + (j > 0 ? '' : ' first-col') + "'"
								+ (j > 0 ? "" : " height='" + this.rowHeight + "' ") + (i > 0 ? "" : " width='" + this.columnWidth + "' ") + "></td>");
					}
				} else {
					var tds = tr.childNodes;
					for ( var j = 0; j < maxColIdx; j++) {
						var td = tds[j];
						var text = '';
						var _cls = cls;
						if (i == 0 && j == 0) {
							_cls += " first-cell";
						}

						if (td) {
							var oldCls = td.getAttribute("class");
							if (oldCls) {
								oldCls = oldCls.split(" ");
								for ( var n = oldCls.length - 1; n >= 0; n -= 1) {
									if (oldCls[i] == 'cell' || oldCls[i] == 'first-col' || oldCls[i] == 'first-row' || oldCls[i] == 'first-cell') {
										oldCls.splice(n, 1);
									}
								}
								_cls += " " + oldCls.join(" ");
							}
							var tdAttrs = [];
							var compNodeHtml = [];
							var style = td.getAttribute("style");
							if (style) {
								style = style.replace(new RegExp("#C1C1C1|#c1c1c1", "gm"), "#010101");
								tdAttrs.push("style='" + style + "'");
							}
							if (i >= 0) {
								var rowSpan = td.getAttribute("rowSpan");
								if (rowSpan) {
									tdAttrs.push("rowspan=" + rowSpan + "");
								}
								var colSpan = td.getAttribute("colSpan");
								if (colSpan) {
									tdAttrs.push("colspan=" + colSpan + "");
								}
								var _cellAttr = td.getAttribute("_cellAttr");
								if (_cellAttr) {
									tdAttrs.push("_cellAttr='" + _cellAttr + "'");
								}
								var cellFormat = td.getAttribute("format");
								if (cellFormat) {
									tdAttrs.push("format=\"" + cellFormat + "\"");
								}
								tdAttrs.push("noWrap='true'");
								var componentId = td.getAttribute("componentId");
								if (componentId) {
									//tdAttrs.push("componentId='" + componentId + "'");
									var ids = componentId.split(",");
									for ( var t = 0; t < ids.length; t++) {
										var html = comMap[ids[t]];
										if (html) {
											compNodeHtml.push(html);
										}
										// comIdToCellMap[ids[t]] = [ i, j ];
									}
								}
								text = td.text;
							}
							var textBuf = [];
							var nodes = td.childNodes;
							for ( var n = 0, nl = nodes.length; n < nl; n++) {
								if (nodes[n].nodeType == 1) {
									textBuf.push(nodes[n].outerHTML);
								} else {
									textBuf.push(nodes[n].nodeValue);
								}
							}

							var v = textBuf.join("");
							if (v) {
								v = v.replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('&lt;br&gt;', '<br>');
							}
							if (compNodeHtml.length > 0) {
								v = (v || "") + compNodeHtml.join("");
							}
							tableHtml.push("<td " + tdAttrs.join(" ") + " d_canAddChild='" + ((i > 0 && j > 0) ? "true" : "false") + "' class='" + _cls + (j > 0 ? '' : ' first-col') + "'"
									+ (j > 0 ? '' : " height='" + this.rowHeight + "' ") + (i > 0 ? "" : " width='" + this.columnWidth + "' ") + ">" + v + "</td>");
						} else if (j >= colCount) {
							tableHtml.push("<td d_canAddChild='" + ((i > 0) ? "true" : "false") + "'  class='" + _cls + (j > 0 ? '' : ' first-col') + "'"
									+ (j > 0 ? '' : " height='" + this.rowHeight + "' ") + (i > 0 ? "" : " width='" + this.columnWidth + "' ") + ">" + text + "</td>");
						}
					}
				}
				tableHtml.push("</tr>");
			}

			tableHtml.push("</table>");
			this.comIdToCellMap = comIdToCellMap;
			return tableHtml.join("");
		},

		buildCellHtml : function(count, text) {
			var cellHtml = [];
			for ( var n = 0; n < count; n++) {
				cellHtml.push("<td d_canAddChild='true' class='cell'>" + (text || '') + "</td>");
			}
			return cellHtml.join("");
		},

		asHtml : function() {
			var maxRowCol = this.getMaxRowColIndex();
			this.updateBeforeCellsHeight(maxRowCol[0], maxRowCol[1]);

			var offset = this.getMaxOffset();
			var maxX = offset.x, maxY = offset.y;

			var html = [];
			if (maxX > 0 && maxY > 0) {
				var rows = this.mainTable.rows;
				html.push('\n  <table cellspacing="0" cellpadding="0" ' + 'rowHeight="' + this.rowHeight.replace("px", "") + '" columnWidth="' + this.columnWidth.replace("px", "") + '"'
						+ ' style="border-collapse:collapse;table-layout:fixed;width:1px;">\n');
				for ( var i = 0;; i++) {
					var row = rows[i];
					if (!row || row.offsetTop + 2 > maxY) {
						break;
					}
					html.push("     <tr>");
					var cells = row.cells;
					for ( var j = 0;; j++) {
						var cell = cells[j];
						if (!cell || cell.offsetLeft + 2 > maxX) {
							break;
						}
						cell.noWrap = true;
						html.push(this.genaCellHtml(cell, i, j));
					}
					html.push("</tr>\n");
				}
				html.push("  </table>\n");
			}

			// alert(indics+"=="+(t2 - t1)+"=="+html.join(""));
			// this.ownerDesigner.println(html.join(""));
			return html.join("");

		},

		updateLayoutContent : function(removeComIds, paths) {
			removeComIds = removeComIds || [];
			var self = this;
			var html = this.asHtml();
			xuiDoc.callMethod(this, "setContent", {
				"layout-data" : html,
				paths : paths,
				removeComIds : removeComIds
			}, function() {
				self.updateAllSelectionUnitBound();
				self.domNode.focus();
			});
			return html;
		},

		/** 生成单元格的html源码* */
		genaCellHtml : function(cell, rowIndex, colIndex, keyComponentIdAttr) {
			var cssText = cell.style.cssText;
			var className = cell.className;
			if (className) {
				var cls = className.split(" ");
				for ( var i = cls.length - 1; i >= 0; i -= 1) {
					if (cls[i] == 'cell' || cls[i] == 'first-col' || cls[i] == 'first-row' || cls[i] == 'first-cell') {
						cls.splice(i, 1);
					}
				}
				className = cls.join(" ");
			}
			className = className ? ' class="' + className + '" ' : "";

			cssText = cssText.replace(new RegExp("#010101", "gm"), "#C1C1C1");
			var attr = (cell.colSpan > 1 ? " colSpan=\"" + cell.colSpan + "\"" : "") + (cell.rowSpan > 1 ? " rowSpan=\"" + cell.rowSpan + "\"" : "") + className
					+ (cssText ? " style=\"" + cssText + "\"" : "");

			var textBuf = [], comIdBuf = [];
			var cellChildNodes = cell.childNodes;
			for ( var n = 0, cl = cellChildNodes.length; n < cl; n++) {
				var node = cellChildNodes[n];
				if (node.nodeType == 1) {
					var comp = this.ownerDesigner.getComponent(node);
					if (comp) {
						comIdBuf.push(comp.domNode.getAttribute("xid"));
					} else if (node.getAttribute("xid")) {
						comIdBuf.push(node.getAttribute("xid"));
					} else {
						textBuf.push("<" + node.tagName + "/>");
					}
				} else {
					if (rowIndex !== 0 && colIndex !== 0) {
						textBuf.push(node.nodeValue);
					}
				}
			}
			if (comIdBuf.length > 0) {
				attr += " componentId=\"" + comIdBuf.join(",") + "\"";
			} else {
				var componentId = cell.getAttribute("componentId");
				if (componentId) {
					attr += " componentId=\"" + componentId + "\"";
				}
			}
			attr = this.buildOtherAttribute(cell, attr);
			var txt = textBuf.join("");
			if (txt) {
				txt = txt.replace(new RegExp("<", "gm"), "&lt;");
				txt = txt.replace(new RegExp(">", "gm"), "&gt;");
			}
			return "<td " + attr + ">" + txt + "</td>";
		},

		/* 预留给子类重写的接口* */
		buildOtherAttribute : function(cell, attr) {
			return attr;
		},

		paintResizeBoxes : function(currentCell, isUpdate, pos) {
			this.currentCell = currentCell;
			var bound = this.getCellBound(currentCell);
			var l = bound.x - 3, t = bound.y - 3, w = bound.w, h = bound.h;
			var p = [ [ l + w + ((currentCell.parentNode.cells.length - 1 == currentCell.cellIndex) ? -2 : 2), t + h / 2 ]/* 东 */
			, [ l + w / 2, t + h + ((this.mainTable.rows.length - 1 == currentCell.parentNode.rowIndex) ? -2 : 2) ] /* 南 */];
			if (!this.resizeBoxes || this.resizeBoxes.length === 0) {
				var pe = this.domNode;
				var html = [];

				if (!pos) {
					pos = "e,s";
				}
				if (pos.indexOf("e") != -1) {
					html.push(this.buildResizBoxHtml(p[0], "e", "e-resize"));// 东
				}
				if (pos.indexOf("s") != -1) {
					html.push(this.buildResizBoxHtml(p[1], "s", "s-resize"));// 南
				}
				this.resizeBoxes = [];
				var self = this;

				$(html.join("")).appendTo(pe).each(function(idx, domE) {
					self.resizeBoxes.push(domE);
				}).bind("mousedown", function(event) {
					if ($(this).attr('direction') == 'e') {
						self.dragResizeColWidth(event, self.currentCell, self);
					} else {
						self.dragResizeRowHeight(event, self.currentCell, self);
					}
					event.stopPropagation();
					event.preventDefault();
				});
			} else {
				$(this.resizeBoxes[0]).css('top', p[0][1]).css('left', p[0][0]);
				$(this.resizeBoxes[1]).css('top', p[1][1]).css('left', p[1][0]);
			}
		},

		buildResizBoxHtml : function(p, direction, cursor) {
			var posStyle = "top:" + p[1] + "px;left:" + p[0] + "px;";
			return "<div class='select-box' isResizeBox='true' direction='" + direction + "' cursor='" + cursor + "' style='cursor:" + cursor + ";z-index:3500;" + posStyle + "'></div>";
		},

		clearResizeBox : function() {
			if (this.resizeBoxes) {
				for ( var i = 0, l = this.resizeBoxes.length; i < l; i++) {
					$(this.resizeBoxes[i]).unbind();
					this.resizeBoxes[i].parentNode.removeChild(this.resizeBoxes[i]);
				}
				this.resizeBoxes = null;
			}
		},

		containInRect : function(x, y, bound) {
			if (x >= bound.x && x <= bound.x + bound.w && y >= bound.y && y <= bound.y + bound.h) {
				return true;
			}
		},

		setProperty : function(config) {
			var propName = config.name;
			var v = config.value;
			if (propName === 'layout-data') {
				if (v == this.asHtml()) {
					return;
				}
				xuiDoc.repaintComponent(this);					

			} else if (propName === 'row-height') {
				if (!v || v == "0") {
					v = 19;
				}
				this.rowHeight = v + "px";
				var rows = this.mainTable.rows;
				for ( var i = 1; i < rows.length; i++) {
					rows[i].cells[0].height = this.rowHeight;
				}
				this.clearSelectionUnit();
				this.updateLayoutContent();
			} else if (propName === 'column-width') {
				if (!v || v == "0") {
					v = 80;
				}
				this.columnWidth = v + "px";
				var cells = this.mainTable.rows[0].cells;
				for ( var i = 1; i < cells.length; i++) {
					cells[i].width = this.columnWidth;
				}
				this.clearSelectionUnit();
				this.updateLayoutContent();
			}
		},

		setCellStyle : function(config) {
			if (!this.selections) {
				return;
			}
			// 直接设置边框样式，不直接更更新
			if (config["border-color"] || config["border-width"] || config["border-style"]) {
				return;
			}

			delete config["methodType"];
			delete config["methodName"];
			var i = 0, j = 0, cells;
			if (!config["cell-layout-border-style"]) {
				for (i = 0, l = this.selections.length; i < l; i++) {
					var cells = this.selections[i].getCells();
					for (j = 0, cCount = cells.length; j < cCount; j++) {
						cell = cells[j];
						if (config["border-color"] !== undefined) {
							if (cell.style.borderWidth == "") {
								continue;
							}
							if (config["border-color"] == "") {
								config["border-color"] = "#000000";
							}
						}
						if (config["border-style"] !== undefined) {
							if (cell.style.borderWidth === "") {
								continue;
							}
						}
						$(cell).css(config);
						this.updateMaxPos(cell);
					}
				}
			} else {
				var style;
				eval("style=" + config["cell-layout-border-style"]);

				var borderStyle = style.style;
				var defaultWidth = style.width + "px";
				var defaultColor = style.color;

				if (!defaultColor) {
					defaultColor = "#010101";
				}
				var defaultPattern = style.pattern;

				for (i = 0, l = this.selections.length; i < l; i++) {
					var bound = this.selections[i].getBound();
					cells = this.selections[i].getCells();
					for (j = 0, cCount = cells.length; j < cCount; j++) {
						config = {};
						var currentCell = cells[j];

						if (borderStyle == "border_all") {
							config["border-width"] = defaultWidth;
							config["border-color"] = defaultColor;
							config["border-style"] = defaultPattern;
							this.setExtCellStyle(bound, currentCell, true, true, defaultWidth, defaultColor, defaultPattern);
						} else if (borderStyle == "border_remove") {
							config["border-width"] = "";
							config["border-color"] = "";
							config["border-style"] = "";

							this.setExtCellStyle(bound, currentCell, true, true, "", "", "");

						} else {
							if (borderStyle == "border_left" || borderStyle == "border_outline" || borderStyle == "border_left_right") {
								if (currentCell.offsetLeft == bound.x) {
									config["border-left-width"] = defaultWidth;
									config["border-left-color"] = defaultColor;
									config["border-left-style"] = defaultPattern;

									this.setExtCellStyle(bound, currentCell, true, false, defaultWidth, defaultColor, defaultPattern);
								}
							}
							if (borderStyle == "border_right" || borderStyle == "border_outline" || borderStyle == "border_left_right") {
								if (currentCell.offsetLeft + currentCell.offsetWidth == bound.x + bound.w) {
									config["border-right-width"] = defaultWidth;
									config["border-right-color"] = defaultColor;
									config["border-right-style"] = defaultPattern;
								}
							}
							if (borderStyle == "border_top" || borderStyle == "border_outline" || borderStyle == "border_top_bottom") {
								if (currentCell.offsetTop == bound.y) {
									config["border-top-width"] = defaultWidth;
									config["border-top-color"] = defaultColor;
									config["border-top-style"] = defaultPattern;

									this.setExtCellStyle(bound, currentCell, false, true, defaultWidth, defaultColor, defaultPattern);
								}
							}
							if (borderStyle == "border_bottom" || borderStyle == "border_outline" || borderStyle == "border_top_bottom") {
								if (currentCell.offsetTop + currentCell.offsetHeight == bound.y + bound.h) {
									config["border-bottom-width"] = defaultWidth;
									config["border-bottom-color"] = defaultColor;
									config["border-bottom-style"] = defaultPattern;
								}
							}
							if (borderStyle == "border_center_v" || borderStyle == "border_center_v_h") {
								if (currentCell.offsetLeft + currentCell.offsetWidth != bound.x + bound.w) {
									config["border-right-width"] = defaultWidth;
									config["border-right-color"] = defaultColor;
									config["border-right-style"] = defaultPattern;
								}
							}
							if (borderStyle == "border_center_h" || borderStyle == "border_center_v_h") {
								if (currentCell.offsetTop + currentCell.offsetHeight != bound.y + bound.h) {
									config["border-bottom-width"] = defaultWidth;
									config["border-bottom-color"] = defaultColor;
									config["border-bottom-style"] = defaultPattern;
								}
							}
						}

						$(currentCell).css(config);
						this.updateMaxPos(currentCell);
					}
				}
			}
			this.updateLayoutContent();
		},

		/* 设置左侧和上侧单元格的边框，解决在ie7中边框合并引起的边框显示不正常的问题 * */
		setExtCellStyle : function(bound, cell, isSetLeft, isSetTop, width, color, pattern) {
			if (isSetLeft && cell.offsetLeft == bound.x) {
				var prevTd = this.getPrevTd(cell);
				if (prevTd) {
					var c = {};
					c["border-right-width"] = width;
					c["border-right-color"] = color;
					c["border-right-style"] = pattern;
					$(prevTd).css(c);
				}

			}
			if (isSetTop && cell.offsetTop == bound.y) {
				var upTd = this.getUpTd(cell);
				if (upTd) {
					var upTdCss = {};
					upTdCss["border-bottom-width"] = width;
					upTdCss["border-bottom-color"] = color;
					upTdCss["border-bottom-style"] = pattern;
					$(upTd).css(upTdCss);
				}
			}
		},

		/** java调用，通过style属性设置* */
		setCellStyleStr : function(params) {
			var style = params.style;
			var isClass = params.isClass;
			var cls = params["class"];
			for ( var i = 0, l = this.selections.length; i < l; i++) {

				var cells = this.selections[i].getCells();
				for ( var j = 0, cCount = cells.length; j < cCount; j++) {
					var cell = cells[j];
					if (isClass == 'true') {
						var newCls = [];
						var oldCls = cell.className;
						if (oldCls) {
							oldCls = oldCls.split(" ");
							for ( var n = 0; n < oldCls.length; n += 1) {
								if (oldCls[n] == 'cell' || oldCls[n] == 'first-cell' || oldCls[n] == 'first-col' || oldCls[n] == 'first-row') {
									newCls.push(oldCls[n]);
								}
							}
						}
						if (cls) {
							newCls.push(cls);
						}
						cell.className = newCls.join(" ");
					} else {
						cell.style.cssText = style;
					}
				}
			}

			this.updateLayoutContent();
		},

		/** 设置列宽* */
		setColWidth : function(colIdx, w) {
			if (w < 0) {
				w = 2;
			}
			this.mainTable.rows[0].cells[colIdx].style.width = w + "px";
			this.updateLayoutContent();
		},

		/** 设置行高* */
		setRowHeight : function(rowIdx, h) {
			if (h < 0) {
				return;
			}
			this.mainTable.rows[rowIdx].cells[0].style.height = h + "px";
			this.updateLayoutContent();
		},

		/** 获取单元格的范围* */
		getCellBound : function(cell) {
			return {
				x : cell.offsetLeft,
				y : cell.offsetTop,
				w : cell.offsetWidth,
				h : cell.offsetHeight
			};
		},

		getOwnerCell : function(target) {
			var p = target;
			while (p) {
				if ($(p).hasClass("cell")) {
					return p;
				}
				p = p.parentNode;
			}
			return p;
		},

		getActivteViewPartElement : function() {
			if (this.currentCell) {
				return this.currentCell;
			}
		},

		/** 根据两个纵坐标返回两个行索引* */
		getRowIndics : function(y1, y2) {
			var rows = this.mainTable.rows;
			var idx1 = -1, idx2 = -1;
			for ( var i = 0, l = rows.length; i < l; i++) {
				var offsetTop = rows[i].offsetTop + 2;
				if (offsetTop >= y1 && idx1 == -1) {
					idx1 = i;
				}
				if (offsetTop >= y2) {
					idx2 = i - 1;
					break;
				}
			}
			if (idx2 == -1) {
				idx2 = rows.length - 1;
			}
			return [ idx1, idx2 ];
		},

		/** 根据横坐标获取第一行的的单元格* */
		getFirstRowCellByPos : function(x) {
			var rows = this.mainTable.rows;
			var firstRow = rows[0];
			var cells = firstRow.cells;
			for ( var i = 0, l = cells.length; i < l; i++) {
				if (x >= cells[i].offsetLeft && x < cells[i].offsetLeft + cells[i].offsetWidth) {
					return cells[i];
				}
			}
		},

		/** 根据纵坐标获取第一列的* */
		getFirstColCellByPos : function(y) {
			var rows = this.mainTable.rows;
			for ( var i = 1, l = rows.length; i < l; i++) {
				var cell = rows[i].cells[0];
				if (y >= cell.offsetTop && y < cell.offsetTop + cell.offsetHeight) {
					return cell;
				}
			}
		},
		/** 获取有效内容的最大坐标* */
		getMaxOffset : function() {
			var rows = this.mainTable.rows;
			var maxX = 0, maxY = 0;
			for ( var i = rows.length - 1; i > 0; i--) {
				var cells = rows[i].cells;
				for ( var j = cells.length - 1; j > 0; j--) {
					var cell = cells[j];
					if (cell.colSpan > 1 || cell.rowSpan > 1 || cell.firstChild || (cell.style.cssText && cell.style.cssText != "HEIGHT: 19px") || cell._cellAttr) {
						var bound = this.getCellBound(cell);
						maxX = Math.max(bound.x + bound.w, maxX);
						maxY = Math.max(bound.y + bound.h, maxY);
					}
				}
			}
			return {
				x : maxX,
				y : maxY
			};
		},

		/** 获取有效最大行列索引* */
		getMaxRowColIndex : function() {
			var maxPos = this.getMaxOffset();
			var maxX = maxPos.x, maxY = maxPos.y;
			if (maxX > 0 && maxY > 0) {
				var indics = this.getRowColIndex(maxX - 3, maxY - 3);
				return [ indics[0] - 1, indics[1] - 1 ];
			} else {
				return [ -1, -1 ];
			}
		},

		/** 根据坐标获取行列索引* */
		getRowColIndex : function(x, y) {
			var rows = this.mainTable.rows;
			var firstRow = rows[0];
			var cells = firstRow.cells;
			var colIdx = -1, rowIdx = -1;
			var i = 0, l = cells.length;
			for (i = 0; i < l; i++) {
				if ((cells[i].offsetLeft + 2) >= x) {
					colIdx = i;
					break;
				}
			}
			for (i = 0, l = rows.length; i < l; i++) {
				if (rows[i].offsetTop + 2 >= y) {
					rowIdx = i;
					break;
				}
			}
			if (colIdx == -1) {
				colIdx = cells.length;
			}
			if (rowIdx == -1) {
				rowIdx = rows.length;
			}
			return [ rowIdx, colIdx ];
		},

		/** 根据条件获取单元格dom节点* */
		getCells : function(startRowIdx/* 开始行 */, endRowIdx/* 结束行 */, startOffsetX, endOffsetX) {
			var rows = this.mainTable.rows;
			var cellArray = [];
			for ( var i = startRowIdx; i <= endRowIdx; i++) {
				var cells = rows[i].cells;
				for ( var j = 0, l = cells.length; j < l; j++) {
					var cell = cells[j];
					if (!cell) {
						break;
					}
					var offsetLeft = cell.offsetLeft;
					if (offsetLeft >= startOffsetX && offsetLeft < endOffsetX) {
						cellArray.push(cell);
					} else if (offsetLeft > endOffsetX) {
						break;
					}
				}
			}
			return cellArray;
		},

		/**
		 * 添加选择一个组件.
		 */
		createSelectionUnit : function(cell) {
			if (!cell) {
				return;
			}
			var dId = this.domNode.getAttribute("d_id");
			if (!this.getSelectionUnit(cell)) {
				this.lastSelectCell = cell;
				this.selections.push(new SelectionUnit(this).setBound(this.getCellBound(cell)));
				this.paintResizeBoxes(cell);
				// this.ownerDesigner.dispatchEvent({event:"cellLayoutSelectionChanged",id:dId,style:
				// cell.style.cssText,value:cell.innerHTML});
				if (this.selctionChangeCaller) {
					clearTimeout(this.selectionClearCaller);
					this.selectionClearCaller = null;
					clearTimeout(this.selctionChangeCaller);
					this.selctionChangeCaller = null;
				}

				var self = this;
				var cls = cell.className;
				var newCls = [];
				if (cls) {
					cls = cls.split(" ");
					for ( var i = 0; i < cls.length; i += 1) {
						if (cls[i] != 'cell' && cls[i] != 'first-cell' && cls[i] != 'first-col' && cls[i] != 'first-row') {
							newCls.push(cls[i]);
						}
					}
				}

				this.selctionChangeCaller = setTimeout(function() {
					if (self.ownerDesigner) {
						self.ownerDesigner.dispatchEvent({
							className : newCls.join(" "),
							event : "cellLayoutSelectionChanged",
							id : dId,
							path : $(cell).getPath(),
							style : cell.style.cssText,
							value : cell.innerHTML
						});
					}
				}, 400);
			}
		},

		/** 根据单元格获取所在的选择单元* */
		getSelectionUnit : function(cell) {
			for ( var i = 0, l = this.selections.length; i < l; i++) {
				if (this.containInRect(cell.offsetLeft + 2, cell.offsetTop + 2, this.selections[i].getBound())) {
					return this.selections[i];
				}
			}
		},

		getDId : function() {
			return this.domNode.getAttribute("d_id");
		},

		/**
		 * 清除所有选择.
		 */
		clearSelectionUnit : function(nofireEvent) {
			for ( var i = 0, l = this.selections.length; i < l; i++) {
				this.selections[i].dispose();
			}
			this.selections = [];
			this.lastSelectCell = null;
			this.currentCell = null;
			this.headerSelectRowIndex = -1;
			this.headerSelectRowIndex = -1;
			this.clearResizeBox();

			if (this.selectionClearCaller) {
				clearTimeout(this.selectionClearCaller);
				this.selectionClearCaller = null;
			}
			if (nofireEvent === true) {
				return;
			}
			var self = this;

			if (self.mouseDownFlag) {
				// 选中cellLayout中其他控件的时候，clearSelection时不延迟处理，以免属性列表变为cellLayout的
				self.ownerDesigner.dispatchEvent({
					event : "cellLayoutClearSeleection",
					id : self.getDId()
				});
			} else {
				this.selectionClearCaller = setTimeout(function() {
					if (self.ownerDesigner) {
						self.ownerDesigner.dispatchEvent({
							event : "cellLayoutClearSeleection",
							id : self.getDId()
						});
					}
				}, 400);
			}
		},

		/** 获取单元格下组件的id，并加入到数组comIds中* */
		_fetchComIds : function(cell, comIds, paths) {
			var childNodes = cell.childNodes;
			for ( var j = childNodes.length - 1; j >= 0; j--) {
				if (childNodes[j] && childNodes[j].nodeType == 1) {
					var d_id = childNodes[j].getAttribute("d_id");
					if (d_id) {
						comIds.push(d_id);
						paths.push($(childNodes[j]).getPath());
					}
				}
			}
		},

		getComIds : function(cells, comIds, paths) {
			cells = (cells.length || cells.length === 0) ? cells : [ cells ];
			for ( var i = cells.length - 1; i >= 0; i--) {
				this._fetchComIds(cells[i], comIds, paths);
			}
		},

		colRowIndicsMap : {},
		
		/** 删除单元格* */
		deleteCells : function(cells/* 可以是一个数组或者单个单元格对象 */, parent, onlyClearContent, comIds, paths) {
			this.stopFireUpdateContent = true;
			var i = 0;
			try {
				cells = (cells.length || cells.length === 0) ? cells : [ cells ];
				if (comIds) {
					for (i = cells.length - 1; i >= 0; i--) {
						this._fetchComIds(cells[i], comIds, paths);
					}
				}
				if (!comIds) {
					comIds = [];
					paths = [];
					for (i = cells.length - 1; i >= 0; i--) {
						this._fetchComIds(cells[i], comIds, paths);
					}

					if (comIds.length > 0) {
						this.ownerDesigner.dispatchEvent({
							event : "removeSelections",
							selections : JSON.stringify(comIds),
							paths : paths
						});
					}
				}

				for (i = cells.length - 1; i >= 0; i--) {
					// this._fetchComIds(cells[i],comIds);
					if (!onlyClearContent) {
						(parent || cells[i].parentNode).removeChild(cells[i]);// TODO:
						// chrome内核屏蔽
					}
				}
				if (onlyClearContent) {
					for (i = cells.length - 1; i >= 0; i--) {
						cells[i].innerHTML = "";
						cells[i].setAttribute("componentId", "");// TODO:
						// chrome内核屏蔽
					}
				}
			} finally {
				this.stopFireUpdateContent = false;
			}
		},
		/** 清除选择单元格的内容* */
		clearCellContent : function() {
			var l = this.selections.length;
			var comIds = [];
			var paths = [];
			this.colRowIndicsMap = {};
			for ( var i = 0; i < l; i++) {
				var cells = this.selections[i].getCells();
				this.deleteCells(cells, null, true, comIds, paths);
			}
			if (l > 0) {
				this.updateLayoutContent(comIds, paths);
			}
		},

		/**
		 * 执行选择.
		 */
		executeSelect : function(event, cell) {
			if (!cell) {
				return;
			}
			var count = this.selections.length;

			if (event.ctrlKey) {
				this.createSelectionUnit(cell);
			} else if (event.shiftKey && count > 0) {
				var target = event.target;
				target = this.getOwnerCell(target);

				if (!target || target.tagName != 'TD' || target.getAttribute("d_canAddChild") != 'true') {
					return;
				}
				this.updateSelectionUnit(target);
				// event.stopPropagation();;
			} else {
				if (this.currentCell != cell) {
					this.clearSelectionUnit();
					this.createSelectionUnit(cell);
				}
			}

		},

		/** 拖拽选择* */
		dragSelect : function(event, cell, self) {
			try {
				var selectionUnit = self.getSelectionUnit(cell);
				if (!selectionUnit) {
					return;
				}

				self.domNode.style.cursor = "default";
				var mousemove = function(event) {
					var target = event.target;
					target = self.getOwnerCell(target);

					if (!target || target.tagName != 'TD' || target.getAttribute("d_canAddChild") != 'true') {
						return;
					}
					self.updateSelectionUnit(target);
					self.isDragSelect = true;
					event.stopPropagation();

				};

				var mouseup = function(event) {
					$(self.domNode).unbind("mouseover", mousemove).unbind("mouseup", mouseup);
					self.isDragSelect = false;
					event.stopPropagation();
				};
				$(self.domNode).bind("mouseover", mousemove).bind("mouseup", mouseup);
			} catch (e) {
				alert("选择出错" + e);
			}

		},

		/** 更新最大位置* */
		updateMaxPos : function(cell) {
			var bound = this.getCellBound(cell);
			this.maxPos.x = Math.max(this.maxPos.x, bound.x + bound.w - 2);
			this.maxPos.y = Math.max(this.maxPos.y, bound.y + bound.h - 2);
		},

		/** 拖拽改变列宽* */
		dragResizeColWidth : function(event, cell, self) {
			self.isResize = true;
			var d = document;

			var oldW = cell.offsetWidth - 1;
			var h = self.domNode.clientHeight;
			var ghost = $("<div class='col-resize-line' style='top:" + self.domNode.scrollTop + "px;left:" + (cell.offsetLeft) + "px;width:" + oldW + "px;height:" + h + "px'></div>").appendTo(
					self.domNode);
			var newW = oldW;
			var x = event.clientX;
			d.onmousemove = function(e) {
				var w = (e || window.event).clientX - x + oldW;
				if (w > 5) {
					ghost.css("width", newW = w);
				}
			};
			d.onmouseup = function(e) {
				self.isResize = false;
				ghost.remove();
				ghost = null;
				d.onmousemove = null;
				d.onmouseup = null;
				d = null;
				if (newW != oldW) {
					var tdBound = self.getCellBound(cell);
					var firstRowCell = self.getFirstRowCellByPos(tdBound.x + tdBound.w - 2);
					if (firstRowCell) {
						self.setColWidth(firstRowCell.cellIndex, firstRowCell.offsetWidth + (newW - oldW));
					}
				}
			};
		},

		/** 拖拽改变行高* */
		dragResizeRowHeight : function(event, cell, self) {
			self.isResize = true;
			var d = document;
			var oldH = cell.offsetHeight - 1;
			var w = self.domNode.clientWidth;

			var ghost = $("<div class='row-resize-line' style='top:" + (cell.offsetTop) + "px;left:" + (self.domNode.scrollLeft) + "px;width:" + w + "px;height:" + oldH + "px'></div>").appendTo(
					self.domNode);
			var newH = oldH;
			var y = event.clientY;

			d.onmousemove = function(e) {
				var h = (e || window.event).clientY - y + oldH;
				if (h > 5) {
					ghost.css("height", newH = h);
				}
			};

			d.onmouseup = function(e) {
				self.isResize = false;
				ghost.remove();
				ghost = null;
				d.onmousemove = null;
				d.onmouseup = null;
				d = null;
				if (newH != oldH) {
					var tdBound = self.getCellBound(cell);
					var firstColCell = self.getFirstColCellByPos(tdBound.y + tdBound.h - 2);
					if (firstColCell) {
						self.setRowHeight(firstColCell.parentNode.rowIndex, firstColCell.offsetHeight + (newH - oldH));
					}
				}
			};
		},

		/** 显示标签输入框* */
		showLabelInput : function(cell) {
			// 单元格内有组件节点时不允许添加文本
			var childNodes = cell.childNodes;
			for ( var i = 0, l = childNodes.length; i < l; i++) {
				if (childNodes[i].nodeType == 1 && childNodes[i].component) {
					return;
				}
			}

			document.body.onselectstart = "";
			var input = $("<textarea  style='top:" + cell.offsetTop + "px;left:" + cell.offsetLeft
					+ "px;border:1px solid;position:absolute;font:normal 12px 宋体, arial, serif;overflow:visible;word-wrap:normal;z-index:8000;overflow-y:hidden'/>")[0];
			var text = cell.innerHTML;
			input.value = text.replaceAll("&nbsp;", " ").replaceAll("<br>", "\n").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
			var size = this.calcTextSize(input.value);
			$(input).css({
				width : Math.max(cell.offsetWidth, size.w) + "px",
				height : Math.max(cell.offsetHeight, size.h) + "px"
			});

			this.domNode.appendChild(input);

			input.onmousedown = function(event) {
				event.stopPropagation();
			};
			input.onmouseup = function(event) {
				event.stopPropagation();
			};
			input.onmousemove = function(event) {
				event.stopPropagation();
			};
			input.onkeydown = function(event) {
				if (event.keyCode == 13) {
					if (event.altKey) {
						// var sel = window.getSelection();
						insertface(input, "\r\n");
						// range.text = "\r\n";
					} else {
						input.blur();
						self.createSelectionUnit(cell);
						setTimeout(function() {
							self.domNode.focus();
						}, 100);
					}
				}

				var size = self.calcTextSize(input.value);
				$(input).css({
					width : Math.max(cell.offsetWidth, size.w) + "px",
					height : Math.max(cell.offsetHeight, size.h) + "px"
				});
				event.stopPropagation();
			};
			var self = this;
			self.currentTextInput = input;
			input.onblur = function(e) {
				document.body.onselectstart = function() {
					return false;
				};
				var value = input.value || "";
				var v = value.replaceAll(" ", "&nbsp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>");

				$(cell).html(v);
				self.updateMaxPos(cell);
				self.currentTextInput = null;
				self.labelChanging = false;

				setTimeout(function() {
					$(input).remove();
				}, 100);
				self.updateLayoutContent();
				cell.focus();
				// $(">input",self.domNode)[0].focus();
			};

			input.focus();
			input.selectionStart = input.selectionEnd = input.value.length;
		},
		
		getLayoutData:function(config){
			config = config || {};
			config.layoutData = this.asHtml();
		},
		
		/** 合并单元格* */
		mergeCell : function() {
			var bounds = [], i = 0, l = this.selections.length;
			for (i = 0; i < l; i++) {
				bounds.push(this.selections[i].getBound());
			}
			if (this.hasIntersection(bounds)) {
				alert("选择区域存在交集，不能合并");
				return;
			}
			var comIds = [];
			var paths = [];
			this.colRowIndicsMap = {};
			for (i = 0, l = this.selections.length; i < l; i++) {
				var bound = this.selections[i].getBound();
				var x1 = bound.x - 2, x2 = bound.x + bound.w - 2;

				var startIndics = this.getRowColIndex(bound.x + 1, bound.y + 1);
				var endIndics = this.getRowColIndex(bound.x + bound.w - 3, bound.y + bound.h - 3);
				var rowSpan = endIndics[0] - startIndics[0];
				var colSpan = endIndics[1] - startIndics[1];

				var selectedCells = this.getCells(startIndics[0], endIndics[0] - 1, x1, x2);

				if (colSpan > 1) {
					selectedCells[0].colSpan = colSpan;
				}
				if (rowSpan > 1) {
					selectedCells[0].rowSpan = rowSpan;
				}
				var cell = selectedCells[0];
				selectedCells.splice(0, 1);
				this.deleteCells(selectedCells, null, null, comIds, paths);
				this.paintResizeBoxes(cell, true);
				this.updateMaxPos(cell);
				this.selections[i].reGetCells();
			}
			this.updateLayoutContent(comIds, paths);
		},

		/** 取消单元格合并* */
		cancelCellMerging : function(updateContent) {
			var rows = this.mainTable.rows;
			for ( var i = 0, l = this.selections.length; i < l; i++) {
				var bound = this.selections[i].getBound();
				var x1 = bound.x - 2, x2 = bound.x + bound.w - 2;

				var startIndics = this.getRowColIndex(bound.x + 1, bound.y + 1);
				var endIndics = this.getRowColIndex(bound.x + bound.w - 3, bound.y + bound.h - 3);

				var rowSpan = endIndics[0] - startIndics[0];
				var colSpan = endIndics[1] - startIndics[1];

				var selectedCells = this.getCells(startIndics[0], endIndics[0] - 1, x1, x2);
				for ( var j = 0, cellCount = selectedCells.length; j < cellCount; j++) {
					colSpan = selectedCells[j].colSpan;
					rowSpan = selectedCells[j].rowSpan;
					if (colSpan > 1) {
						// 取消首行合并
						$(this.buildCellHtml(colSpan - 1)).insertAfter(selectedCells[j]);
						selectedCells[j].colSpan = 1;
					}

					if (rowSpan > 1) {
						var cellHtml = this.buildCellHtml(colSpan);
						var offsetX = selectedCells[j].offsetLeft;
						var rowIndics = this.getRowIndics(selectedCells[j].offsetTop, selectedCells[j].offsetTop + selectedCells[j].clientHeight);
						for ( var rowIdx = rowIndics[0] + 1; rowIdx <= rowIndics[1]; rowIdx++) {
							var cells = rows[rowIdx].cells;
							for ( var cellIdx = 0, cellL = cells.length; cellIdx < cellL; cellIdx++) {
								var cell = cells[cellIdx];
								var nextCell = cells[cellIdx + 1];

								if (cell.offsetLeft < offsetX && ((nextCell && nextCell.offsetLeft > offsetX) || !nextCell)) {
									$(cellHtml).insertAfter(cell);
									break;
								}
							}
						}
						selectedCells[j].rowSpan = 1;
					}
				}
			}
			this.paintResizeBoxes(this.currentCell, true);
			if (updateContent !== false) {
				this.updateLayoutContent();
			}
		},

		insertRowAfter : function() {
			this.insertRow(true);
		},

		/** 插入行* */
		insertRow : function(isAfter) {
			if (this.selections.length > 1) {
				alert("有多个选择区域时不能插入");
				return;
			}
			if (this.selections.length === 0) {
				alert("请选择单元格");
				return;
			}
			var selection = this.selections[0];
			var spanCount = 0;
			var rowIndex = -1;
			var i = 0;
			var td;
			if (selection && selection.getCells().length > 0) {
				var currTd = selection.getCells()[0];
				var currTr = currTd.parentNode;
				var prevTr = currTr.previousSibling;
				rowIndex = currTr.rowIndex;
				while (prevTr) {
					for (i = 0; i < prevTr.cells.length; i++) {
						td = prevTr.cells[i];
						if (td.rowSpan >= 2 && prevTr.rowIndex + td.rowSpan > rowIndex) {
							td.rowSpan = td.rowSpan + 1;
							spanCount += td.colSpan;
						}
					}
					prevTr = prevTr.previousSibling;
				}
			} else if (this.headerSelectRowIndex >= 0) {
				rowIndex = this.headerSelectRowIndex;
			}

			if (isAfter === true) {
				rowIndex++;
			}
			var tdHeight = 0;
			var cellCount = this.mainTable.rows[0].cells.length - spanCount;
			var tr = rowIndex != -1 ? this.mainTable.insertRow(rowIndex) : this.mainTable.insertRow();
			tr.setAttribute("d_canAddChild", "false");
			for (i = 0; i < cellCount; i++) {
				td = tr.insertCell(i);
				td.className = "cell" + (i === 0 ? " first-col" : "");
				if (i === 0) {
					td.height = this.rowHeight;
				}
				td.setAttribute("d_canAddChild", "true");
				if (i === 0) {
					tdHeight = td.offsetHeight;
				}
			}
			this.updateLayoutContent();
		},

		insertColAfter : function() {
			this.insertCol(true);
		},

		/** 插入列* */
		insertCol : function(isAfter) {
			if (this.selections.length > 1) {
				alert("有多个选择区域时不能插入");
				return;
			}
			if (this.selections.length === 0) {
				alert("请选择单元格");
				return;
			}
			var selection = this.selections[0];
			var i = 0;
			var tr;
			if (selection && selection.getCells().length > 0 || this.headerSelectColIndex >= 0) {
				var currTd = null;
				if (this.headerSelectColIndex >= 0) {
					currTd = this.currentCell;
				} else {
					currTd = selection.getCells()[0];
				}

				var currColIndex = this.getColIndex(currTd);

				if (isAfter === true) {
					currColIndex++;
				}

				var maxRow = this.mainTable.rows.length;
				var insertColumnIndexes = [];
				var spanCells = [];
				var spanCellsSpan = [];
				for (i = 0; i < maxRow; i++) {
					tr = this.mainTable.rows[i];
					insertColumnIndexes[i] = tr.cells.length;
					for ( var j = 1, l = tr.cells.length; j < l; j++) {
						var td = tr.cells[j];
						var colIndex = td.cellIndex;
						if (i <= maxRow) {
							colIndex = this.getColIndex(td);
							if (colIndex == -1) {
								break;
							}
						}
						if (colIndex == currColIndex) {
							insertColumnIndexes[i] = td.cellIndex;
							break;

						} else if (td.colSpan >= 2 && colIndex + td.colSpan > currColIndex) {
							spanCells.push(td);
							spanCellsSpan.push(td.colSpan + 1);
							break;
						} else if (colIndex + 1 == currColIndex) {
							var nextTd = td.nextSibling;
							if (nextTd) {
								insertColumnIndexes[i] = nextTd.cellIndex;
								break;
							}
						} else if (colIndex > currColIndex) {
							break;
						}
					}
				}

				for (i = 0; i < spanCells.length; i++) {
					spanCells[i].colSpan = spanCellsSpan[i];
				}
				var tdWidth = 0;
				for (i = 0; i < this.mainTable.rows.length; i++) {
					if (insertColumnIndexes[i] != -1) {
						tr = this.mainTable.rows[i];
						var newtd = tr.insertCell(insertColumnIndexes[i]);
						newtd.className = "cell" + (i === 0 ? " first-row" : "");
						if (i === 0) {
							newtd.width = this.columnWidth;
						}
						newtd.setAttribute("d_canAddChild", "true");
						if (i === 0) {
							tdWidth = newtd.offsetWidth;
						}
					}
				}
			} else {
				for (i = 0; i < this.mainTable.rows.length; i++) {
					tr = this.mainTable.rows[i];
					var newtd1 = tr.insertCell();
					newtd1.className = "cell" + (i === 0 ? " first-row" : "");
					if (i === 0) {
						newtd1.width = this.columnWidth;
					}
					newtd1.setAttribute("d_canAddChild", "true");
				}
			}
			this.updateLayoutContent();
		},

		/** 删除行* */
		deleteRow : function() {
			if ((!this.selections[0] || this.selections[0].getCells().length === 0) && (this.headerSelectRowIndex < 0)) {
				return;
			}
			var rows = [];
			var i = 0, j = 0, k = 0;
			if (this.headerSelectRowIndex >= 0) {
				rows = [ this.mainTable.rows[this.headerSelectRowIndex] ];
			} else {
				var rowIndexs = {};
				for (i = 0; i < this.selections.length; i++) {
					var cells = this.selections[i].getCells();
					for (j = 0; j < cells.length; j++) {
						var tr = cells[j].parentNode;
						var rowIndex = tr.rowIndex;
						if (!rowIndexs["_" + rowIndex]) {
							rows.push(tr);
							rowIndexs["_" + rowIndex] = true;
						}
						for (k = 1; k < cells[j].rowSpan; k++) {
							if (!rowIndexs["_" + (rowIndex + k)]) {
								rows.push(this.mainTable.rows[rowIndex + k]);
								rowIndexs["_" + (rowIndex + k)] = true;
							}
						}
					}
				}
				// 得到排序后需要被删除的行
				rows = rows.sort(function(a, b) {
					return a.rowIndex > b.rowIndex;
				});
			}
			// 处理选中单元格之前的rowSpan
			var prevTr = rows[rows.length - 1].previousSibling;
			while (prevTr) {
				for (i = 0; i < prevTr.cells.length; i++) {
					var td = prevTr.cells[i];
					if (td.rowSpan >= 2) {
						for (j = 0; j < rows.length; j++) {
							if (prevTr.rowIndex + td.rowSpan > rows[j].rowIndex) {
								td.rowSpan = td.rowSpan - 1;
							}
						}
					}
				}
				prevTr = prevTr.previousSibling;
			}
			var comIds = [];
			var paths = [];
			this.colRowIndicsMap = {};
			// 删除选中的行，并处理有rowSpan的单元格之后的行
			for (i = rows.length - 1; i >= 0; i--) {
				var row = rows[i];
				for (j = 0; j < row.cells.length; j++) {
					var cell = row.cells[j];
					if (cell.rowSpan >= 2) {
						var colIndex = this.getColIndex(cell);
						var nextTr = row.nextSibling;
						for (k = 0; k < nextTr.cells.length; k++) {
							var nextCell = nextTr.cells[k];
							var nextCellColIndex = this.getColIndex(nextCell);
							if (nextCellColIndex >= colIndex) {
								var newtd = nextTr.insertCell(nextCell.cellIndex);
								newtd.rowSpan = cell.rowSpan - 1;
								newtd.colSpan = cell.colSpan;
								newtd.className = "cell";
								newtd.setAttribute("d_canAddChild", "true");
								break;
							}
						}
					}
				}
				this.deleteCells(row.cells, row, null, comIds, paths);
				this.mainTable.deleteRow(row.rowIndex);
			}
			this.clearSelectionUnit();
			this.updateLayoutContent(comIds, paths);
		},

		/** 删除列* */
		deleteCol : function() {
			if ((!this.selections[0] || this.selections[0].getCells().length === 0) && (this.headerSelectColIndex < 0)) {
				return;
			}
			var options = [];
			var i = 0, k = 0;
			var row;
			var selectionBounds = [];
			if (this.headerSelectColIndex >= 0) {
				selectionBounds.push(this.getCellBound(this.mainTable.rows[0].cells[this.headerSelectColIndex]));
			} else {
				for (k = 0; k < this.selections.length; k++) {
					selectionBounds.push(this.selections[k].getBound());
				}
			}

			for (i = 0; i < this.mainTable.rows.length; i++) {
				row = this.mainTable.rows[i];
				for ( var j = 0; j < row.cells.length; j++) {
					var cell = row.cells[j];
					var cellBound = this.getCellBound(cell);

					for (k = 0; k < selectionBounds.length; k++) {
						var selBound = selectionBounds[k];
						if (Math.max(cellBound.x, selBound.x) < Math.min(cellBound.x + cellBound.w, selBound.x + selBound.w)) {
							var option = {};
							option.rowIndex = i;
							option.cellIndex = cell.cellIndex;
							if (cell.colSpan > 1) {
								option.colSpan = cell.colSpan - 1;
							} else {
								option.del = true;
							}
							options.push(option);
							break;
						}
					}

				}
			}
			var comIds = [];// 记录删除的组件id
			var paths = [];
			this.colRowIndicsMap = {};
			for (i = options.length - 1; i >= 0; i--) {
				var rowIndex = options[i].rowIndex;
				var cellIndex = options[i].cellIndex;
				row = this.mainTable.rows[rowIndex];
				if (options[i].del) {
					this.deleteCells(row.cells[cellIndex], row, null, comIds);
				} else {
					row.cells[cellIndex].colSpan = options[i].colSpan;
				}
			}
			this.clearSelectionUnit();
			this.updateLayoutContent(comIds, paths);
		},

		/** 获得td的列索引* */
		getColIndex : function(td) {
			try {
				var tdBound = this.getCellBound(td);
				var firstRowTd = this.getFirstRowCellByPos(tdBound.x, tdBound.w - 2);
				return firstRowTd.cellIndex;
			} catch (e) {
				return -1;
			}
		},

		/** 获得选择的列索引* */
		getSectionsColIndexes : function() {
			var indexes = [];
			var cells = this.mainTable.rows[0].cells;
			for ( var i = 1; i < cells.length; i++) {
				var cellBound = this.getCellBound(cells[i]);
				for ( var j = 0; j < this.selections.length; j++) {
					var selBound = this.selections[j].getBound();
					if (cellBound.x >= selBound.x && cellBound.x < selBound.x + selBound.w) {
						indexes.push(cells[i].cellIndex);
						break;
					}
				}
			}
			return indexes;
		},

		/** 计算文本区域大小 */
		calcTextSize : function(text) {
			var tempSpan = window.tempSpan;
			if (!tempSpan) {
				tempSpan = document.createElement("span");
				tempSpan.style.position = "absolute";
				tempSpan.style.top = "-100px";
				tempSpan.style.font = "normal 13px 宋体, arial, serif;";
				document.body.appendChild(tempSpan);
				window.tempSpan = tempSpan;
			}
			tempSpan.style.display = "";
			tempSpan.innerHTML = text.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;");
			var w = tempSpan.offsetWidth + 20;
			var h = tempSpan.offsetHeight + 10;
			tempSpan.style.display = "none";
			return {
				w : w,
				h : h
			};
		},

		/** 选择区域向由左移动* */
		gotoPrevTd : function(td, isShiftKey) {
			var prevTd = this.getPrevTd(td);

			if (prevTd && prevTd.cellIndex > 0) {
				if (prevTd.offsetLeft < this.domNode.scrollLeft) {
					this.domNode.scrollLeft = prevTd.offsetLeft;
				}
				if (!isShiftKey) {
					this.clearSelectionUnit();
					this.createSelectionUnit(prevTd);
				} else {
					this.updateSelectionUnit(prevTd);
				}
			}
		},

		getPrevTd : function(td) {

			var tdBound = this.getCellBound(td);
			var firstRowTd = this.getFirstRowCellByPos(tdBound.x, tdBound.w - 2);

			var prevFirstRowTd = firstRowTd.previousSibling;
			if (!prevFirstRowTd) {
				return;
			}

			var bound1 = this.getCellBound(prevFirstRowTd);
			var prevTd = null;
			var tr = td.parentNode;
			if (td.rowSpan > 1) {
				try {
					tr = this.mainTable.rows[this.moveRowIndex];
				} catch (e) {
				}
			}
			while (tr && !prevTd) {
				for ( var i = 1, l = tr.cells.length; i < l; i++) {
					var bound2 = this.getCellBound(tr.cells[i]);
					if (Math.max(bound1.x, bound2.x) < Math.min(bound1.x + bound1.w, bound2.x + bound2.w)) {
						prevTd = tr.cells[i];
						break;
					}
				}
				tr = tr.previousSibling;
			}
			return prevTd;

		},

		/** 选择区域向由右移动* */
		gotoNextTd : function(td, isShiftKey) {
			var tdBound = this.getCellBound(td);
			var firstRowTd = this.getFirstRowCellByPos(tdBound.x, tdBound.w - 2);

			var nextFirstRowTd = firstRowTd.nextSibling;
			if (!nextFirstRowTd) {
				return;
			}
			var i = 0;
			for (i = 1; i < td.colSpan; i++) {
				if (nextFirstRowTd) {
					nextFirstRowTd = nextFirstRowTd.nextSibling;
				}
			}
			if (!nextFirstRowTd) {
				return;
			}

			var bound1 = this.getCellBound(nextFirstRowTd);
			var nextTd = null;
			var tr = td.parentNode;
			if (td.rowSpan > 1) {
				try {
					tr = this.mainTable.rows[this.moveRowIndex];
				} catch (e) {
				}
			}
			while (tr && !nextTd) {
				var l = tr.cells.length;
				for (i = 1; i < l; i++) {
					var bound2 = this.getCellBound(tr.cells[i]);
					if (Math.max(bound1.x, bound2.x) < Math.min(bound1.x + bound1.w, bound2.x + bound2.w)) {
						nextTd = tr.cells[i];
						break;
					}
				}
				tr = tr.previousSibling;
			}

			if (nextTd) {
				if (nextTd.offsetLeft + nextTd.offsetWidth + 20 > this.domNode.scrollLeft + this.domNode.offsetWidth) {
					this.domNode.scrollLeft = this.domNode.scrollLeft + nextTd.offsetWidth;
				}
				if (!isShiftKey) {
					this.clearSelectionUnit();
					this.createSelectionUnit(nextTd);
				} else {
					this.updateSelectionUnit(nextTd);
				}
			}
		},

		/** 选择区域向上移动* */
		gotoUpTd : function(td, isShiftKey) {
			var upTd = this.getUpTd(td);

			if (!upTd || upTd.parentNode.rowIndex === 0) {
				return;
			}
			if (upTd.offsetTop < this.domNode.scrollTop) {
				this.domNode.scrollTop = upTd.offsetTop;
			}
			if (!isShiftKey) {
				this.clearSelectionUnit();
				this.createSelectionUnit(upTd);
			} else {
				this.updateSelectionUnit(upTd);
			}
			this.moveRowIndex = upTd.parentNode.rowIndex;

		},

		getUpTd : function(td) {
			var upTd = null;
			var prevTr = td.parentNode.previousSibling;
			while (prevTr && !upTd) {
				var bound1 = this.getCellBound(td);
				for ( var i = 1, l = prevTr.cells.length; i < l; i++) {
					var bound2 = this.getCellBound(prevTr.cells[i]);
					if (Math.max(bound1.x, bound2.x) < Math.min(bound1.x + bound1.w, bound2.x + bound2.w)) {
						upTd = prevTr.cells[i];
						break;
					}
				}
				prevTr = prevTr.previousSibling;
			}
			return upTd;
		},

		/** 选择区域向由下移动* */
		gotoDownTd : function(td, isShiftKey) {
			var downTd = null;
			var nextTr = td.parentNode.nextSibling;
			while (nextTr && !downTd) {
				var bound1 = this.getCellBound(td);
				for ( var i = 1, l = nextTr.cells.length; i < l; i++) {
					var bound2 = this.getCellBound(nextTr.cells[i]);
					if (Math.max(bound1.x, bound2.x) < Math.min(bound1.x + bound1.w, bound2.x + bound2.w)) {
						downTd = nextTr.cells[i];
						break;
					}
				}
				nextTr = nextTr.nextSibling;
			}
			if (!downTd) {
				return;
			}
			if (downTd.offsetTop + downTd.offsetHeight + 20 > this.domNode.scrollTop + this.domNode.offsetHeight) {
				this.domNode.scrollTop = this.domNode.scrollTop + downTd.offsetHeight;
			}
			if (!isShiftKey) {
				this.clearSelectionUnit();
				this.createSelectionUnit(downTd);
			} else {
				this.updateSelectionUnit(downTd);
			}
			this.moveRowIndex = downTd.parentNode.rowIndex;
		},

		updateAllSelectionUnitBound : function() {
			for ( var i = 0; i < this.selections.length; i++) {
				var sel = this.selections[i];
				sel.updateBound();
			}
			this.paintResizeBoxes(this.currentCell);
		},

		/** 更新选择框* */
		updateSelectionUnit : function(target) {
			this.currentCell = target || this.currentCell;
			if (!this.currentCell) {
				return;
			}
			var self = this;
			var bound0 = self.getCellBound(this.lastSelectCell);
			var x0 = bound0.x, y0 = bound0.y;
			var x1 = x0 + bound0.w, y1 = y0 + bound0.h;

			// 不选择第一行，第一列
			if ($(target).hasClass("first-row") || $(target).hasClass('first-col')) {
				return;
			}
			// 获取当前鼠标所在的单元格的范围
			var bound = self.getCellBound(target);

			// 计算选择范围
			var minX = Math.min(x0, bound.x);
			var minY = Math.min(y0, bound.y);

			var w = Math.max(x1, bound.x + bound.w) - minX;
			var h = Math.max(y1, bound.y + bound.h) - minY;

			// 更新选择框的范围
			this.selections[this.selections.length - 1].setBound({
				x : minX,
				y : minY,
				w : w,
				h : h
			});
			self.paintResizeBoxes(target, true);
		},

		/** 判断多个区域是否相交 */
		hasIntersection : function(bounds) {
			for ( var i = 0; i < bounds.length; i++) {
				var b1 = bounds[i];
				for ( var j = i + 1; j < bounds.length; j++) {
					var b2 = bounds[j];
					if (Math.max(b1.x, b2.x) < Math.min(b1.x + b1.w, b2.x + b2.w) && Math.max(b1.y, b2.y) < Math.min(b1.y + b1.h, b2.y + b2.h)) {
						return true;
					}
				}
			}
			return false;
		},

		importFromExcel : function() {

		},

		/** java调用，获得当前cell单元格值* */
		getCurrentCellValue : function() {
			if (this.currentCell) {
				return this.currentCell.innerHTML;
			} else {
				return "";
			}
		},

		/** java调用，设置当前cell单元格值* */
		setCurrentCellValue : function(map) {
			if (this.currentCell) {
				this.currentCell.innerHTML = map.data;
			}
		},

		/** java调用获得选中单元格属性，目前只实现了行高、列宽* */
		getCurrentCellProperties : function() {
			// 改为所有选中的单元格
			var data = {
				width : 80,
				height : 19
			};
			var rows = this.getSelectionsRows();
			var i = 0;
			for (; i < rows.length; i++) {
				var row = rows[i];
				var rowStyleHeight = row.cells[0].style.height;
				if (i === 0) {
					if (rowStyleHeight) {
						data.height = rowStyleHeight;
					} else {
						data.height = "19px";
					}
				} else if (rowStyleHeight && rowStyleHeight != data.height) {
					data.height = "0px";
					break;
				}
			}
			data.height = parseInt(data.height.replace("px", ""), 10);

			var colIndexes = this.getSectionsColIndexes();
			for (i = 0; i < colIndexes.length; i++) {
				var cell = this.mainTable.rows[0].cells[colIndexes[i]];
				if (i === 0) {
					data.width = cell.offsetWidth - 1;
				} else {
					if (data.width != cell.offsetWidth - 1) {
						data.width = 0;
						break;
					}
				}
			}
			return JSON.stringify(data);
		},

		/** java调用设置单元格属性，目前只实现了行高、列宽* */
		setCellProperties : function(data) {

			// 修改行高列宽前，先记录selection对应的cells. 只是由于sel.getCells()方法的实现决定的
			var selMapList = [];
			var i = 0;
			var cells;

			for (; i < this.selections.length; i++) {
				var sel = this.selections[i];
				cells = sel.getCells();
				if (cells.length > 0) {
					selMapList.push({
						sel : sel,
						cells : cells
					});
				}
			}

			if (data.columnWidth > 0) {
				var columnIndexes = this.getSectionsColIndexes();
				for (i = 0; i < columnIndexes.length; i++) {
					this.mainTable.rows[0].cells[columnIndexes[i]].style.width = data.columnWidth + "px";
				}
			}
			if (data.rowHeight > 0) {
				var rows = this.getSelectionsRows();
				for (i = 0; i < rows.length; i++) {
					rows[i].cells[0].style.height = data.rowHeight + "px";
				}
			}
			this.updateLayoutContent();
		},

		/** 获得选择的所有单元格对应的行* */
		getSelectionsRows : function() {
			var rows = [];
			if (this.headerSelectRowIndex >= 0) {
				rows = [ this.mainTable.rows[this.headerSelectRowIndex] ];
			} else {
				var rowIndexs = {};
				for ( var i = 0; i < this.selections.length; i++) {
					var cells = this.selections[i].getCells();
					for ( var j = 0; j < cells.length; j++) {
						var tr = cells[j].parentNode;
						var rowIndex = tr.rowIndex;
						if (!rowIndexs["_" + rowIndex]) {
							rows.push(tr);
							rowIndexs["_" + rowIndex] = true;
						}
						for ( var k = 1; k < cells[j].rowSpan; k++) {
							if (!rowIndexs["_" + (rowIndex + k)]) {
								rows.push(this.mainTable.rows[rowIndex + k]);
								rowIndexs["_" + (rowIndex + k)] = true;
							}
						}
					}
				}
				// 得到排序后的行
				rows = rows.sort(function(a, b) {
					return a.rowIndex > b.rowIndex;
				});
			}
			return rows;
		},

		updateBeforeCellsHeight : function(rowIndex, maxColIndex) {
			for ( var i = 1; i <= rowIndex; i++) {
				var tr = this.mainTable.rows[i];
				if (!tr) {
					break;
				}

				var colCount = tr.cells.length;
				var trHeight = tr.cells[0].style.height;
				if (trHeight) {
					trHeight = parseInt(trHeight.replace("px", ""), 10);
				} else {
					trHeight = 19;
				}
				var k;
				for ( var j = 1; j <= maxColIndex && j < colCount; j++) {
					var cell = tr.cells[j];
					if (!cell) {
						break;
					}
					if (cell.rowSpan < 2) {
						cell.style.height = trHeight + "px";
					} else {
						var height = trHeight;
						for (k = 1; k < cell.rowSpan; k++) {
							var h = this.mainTable.rows[i + k].cells[0].style.height;
							if (h) {
								h = parseInt(h.replace("px", ""), 10);
							} else {
								h = 19;
							}
							height += h;
						}
						cell.style.height = height + "px";
					}
					var childNodes = cell.childNodes;
					var l = childNodes.length;
					for (k = 0; k < l; k++) {
						if (childNodes[k].tagName == "TEXTAREA") {
							childNodes[k].style.height = cell.style.height;
						}
					}
				}
			}
		},
		showHideCellBorder : function() {
			var cls = this.mainTable.className;
			if (cls.indexOf("nocellborder") == -1) {
				cls += " nocellborder";
			} else {
				cls = cls.replace("nocellborder", "");
			}
			this.mainTable.className = cls;
		},
		getCell : function(rowIdx, colIdx) {
			var row = this.mainTable.rows[rowIdx];
			if (row) {
				return row.cells[colIdx];
			}
		}
	};

	return {
		'$UI/system/components/justep/cellLayout/cellLayout' : CellLayout
	};
});