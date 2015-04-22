<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:787px;top:119px;">{{#each datas}} 
    <div component="$UI/system/components/justep/reportData/reportData" xid="{{data_xid}}"> 
      <source> 
        <action name="{{data_action}}" type="{{dataType}}" columns="{{data_relations}}"/> 
      </source> 
    </div> {{/each}}
  </div>  
<div xid="view"> 
      <div component="$UI/system/components/justep/chart/chart" chart-name="chart"
        autoLoad="true" data-list="{{data_Id}}" xid="chart1" class="x-chart"> 
        <chart> 
          <config xid="default1">{{#each title_data}}{{#if showTitle}}
            <title xid="default2" visible="{{isshow}}" position="{{chartPosition}}">{{chartTitle}}</title>  
            <title-vertical-alignment xid="default4">{{vertical}}</title-vertical-alignment>  
            <title-horizontal-alignment xid="default5">{{horizontal}}</title-horizontal-alignment>  
            <title-font xid="default6" name="{{fontType}}" style="{{fontStyle}}" size="{{fontSize}}"/> {{/if}}{{/each}} {{#each detailTitle_data}}{{#if showTitle}}
            <sub-title xid="default2" visible="{{isshow}}" position="{{chartPosition}}">{{chartTitle}}</sub-title>  
            <sub-title-vertical-alignment xid="default4">{{vertical}}</sub-title-vertical-alignment>  
            <sub-title-horizontal-alignment xid="default5">{{horizontal}}</sub-title-horizontal-alignment>  
            <sub-title-font xid="default6" name="{{fontType}}" style="{{fontStyle}}" size="{{fontSize}}"/> {{/if}}{{/each}}{{#each legend_data}}{{#if showTitle}}
            <legend visible="{{isshow}}" position="{{chartPosition}}"/>  
            <legend-vertical-alignment>{{vertical}}</legend-vertical-alignment>  
            <legend-horizontal-alignment>{{horizontal}}</legend-horizontal-alignment>{{/if}}{{/each}}{{#each notes_data}}{{#if showTitle}}
            <comment xid="default2" visible="{{isshow}}" position="{{chartPosition}}">{{chartTitle}}</comment>  
            <comment-vertical-alignment xid="default4">{{vertical}}</comment-vertical-alignment>  
            <comment-horizontal-alignment xid="default5">{{horizontal}}</comment-horizontal-alignment>  
            <comment-font xid="default6" name="{{fontType}}" style="{{fontStyle}}" size="{{fontSize}}"/> {{/if}}{{/each}}
          </config>  
          <series-set xid="series-set2">{{#each chartData}}
            <series xid="chartSeries2" chart-type="{{chart_type}}" name="{{chart_name}}">{{#if selectDefaultChart}}
              <data title="{{groupID}}" categoryAxis="{{typeID}}" numberAxis="{{numID}}"
                ref="{{dataID}}" autoData="true" xid="default3"/> {{else}}{{#if selectPieChart}}
              <data categoryAxis="{{typeID}}" numberAxis="{{numID}}" ref="{{dataID}}"
                autoData="true" xid="default3"/> {{/if}}{{#if selectMeterChart}}
              <data value="{{metervalue}}" ref="{{dataID}}" autoData="true"
                xid="default3"/> {{/if}}{{#if selectGanttChart}}
              <data title="{{groupTitle}}" categoryAxis="{{typeID}}" startDate="{{startTime}}"
                endDate="{{endTime}}" ref="{{dataID}}" autoData="true" xid="default3"/> {{/if}}{{/if}}{{/each}} {{#each chartData}}
              <href model="{{hrefModel}}" title="{{hrefTitle}}" xid="default3">{{hrefAdr}}</href> {{/each}}
              <config xid="default7">{{#each piechart_data}} {{#if showCfg}}
                <background-alpha xid="default16">{{bgAlpha}}</background-alpha>  
                <foreground-alpha xid="default17">{{fgAlpha}}</foreground-alpha>  
                <no-data-message xid="default18">{{ndm}}</no-data-message>  
                <is-circular xid="default19">{{isCir}}</is-circular>  
                <label-gap xid="default20">{{laGap}}</label-gap>  
                <label-font xid="default21" name="{{lafontName}}" style="{{lafontStyle}}"
                  size="{{lafontSize}}"/>  
                <pie-label-style xid="default22">{{pls}}</pie-label-style>  
                <pie-label-number-format xid="default23">{{plnf}}</pie-label-number-format>  
                <pie-label-percent-format xid="default24">{{plpf}}</pie-label-percent-format>  
                <map-tool-tip-label-style xid="default25">{{mttls}}</map-tool-tip-label-style>  
                <map-tool-tip-number-format xid="default26">{{mttnf}}</map-tool-tip-number-format>  
                <map-tool-tip-percent-format xid="default27">{{mttpf}}</map-tool-tip-percent-format>{{/if}}{{/each}}{{#each verticalbarlinechart_data}}{{#if showCfg}}
                <category-title>{{titleName}}</category-title>  
                <category-title-color>#000000</category-title-color>  
                <category-title-font name="{{titlefontName}}" style="{{titlefontStyle}}" size="{{titlefontSize}}"/>  
                <category-margin>{{margin}}</category-margin>  
                <category-upper-margin>{{upperMargin}}</category-upper-margin>  
                <category-lower-margin>{{lowerMargin}}</category-lower-margin>  
                <category-label-max-width>{{labelWidth}}</category-label-max-width>  
                <category-item-label-visible>{{isVisible}}</category-item-label-visible>  
                <category-item-label-font name="{{itemfontName}}" style="{{itemfontType}}" size="{{itemfontSize}}"/>  
                <category-item-label-color>#000000</category-item-label-color>  
                <category-item-label-number-format>{{itemNumFm}}</category-item-label-number-format>  
                <category-item-margin>{{itemMargin}}</category-item-margin>  
                <category-item-max-width>{{itemMaxWid}}</category-item-max-width>  
                <category-item-outline color="#BEBEBE" stroke="0.3f"/>  
                <category-item-label-angle>{{labelAngle}}</category-item-label-angle>  
                <category-tick-label-font name="{{tickfontName}}" style="{{tickfontStyle}}" size="{{tickfontSize}}"/>  
                <category-tick-label-color>#000000</category-tick-label-color>{{/if}}{{/each}} {{#each verticalbarlinechart_data}}{{#if dateRound}}
                <date-format time-period="{{dateRound}}">{{dateType}}</date-format>{{/if}}{{/each}} {{#each verticalxylinechart_data}}{{#if showCfg}}
                <category-title>{{titleName}}</category-title>  
                <category-title-color>#000000</category-title-color>  
                <category-title-font name="{{titlefontName}}" style="{{titlefontStyle}}" size="{{titlefontSize}}"/>  
                <category-upper-margin>{{upperMargin}}</category-upper-margin>  
                <category-lower-margin>{{lowerMargin}}</category-lower-margin>  
                <category-item-label-visible>{{isVisible}}</category-item-label-visible>  
                <category-item-label-font name="{{itemfontName}}" style="{{itemfontType}}" size="{{itemfontSize}}"/>  
                <category-item-label-color>#000000</category-item-label-color>  
                <category-item-label-number-format>{{itemNumFm}}</category-item-label-number-format>  
                <category-tick-label-font name="{{tickfontName}}" style="{{tickfontStyle}}" size="{{tickfontSize}}"/>  
                <category-tick-label-color>#000000</category-tick-label-color>  
                <category-number visible="{{isshowType}}" auto="{{num_auto}}" start="{{num_start}}"
                  end="{{num_end}}" step="{{num_step}}"/>  
                <category-number-format>{{labelWidth}}</category-number-format> {{/if}}{{/each}} {{#each horizontalganttchart_data}}{{#if showCfg}}
                <category-title>{{titleName}}</category-title>  
                <category-title-color>#000000</category-title-color>  
                <category-title-font name="{{titlefontName}}" style="{{titlefontStyle}}" size="{{titlefontSize}}"/>  
                <category-tick-label-font name="{{tickfontName}}" style="{{tickfontStyle}}" size="{{tickfontSize}}"/>  
                <category-tick-label-color>#000000</category-tick-label-color>  
                <category-item-label-angle>{{labelAngle}}</category-item-label-angle> {{/if}}{{/each}} {{#each radarchart_data}}{{#if showType}}
                <label-font name="{{fontName}}" style="{{fontStyle}}" size="{{fontSize}}"/>  
                <label-color>#000000</label-color>  
                <ticks-count>{{ticks_count}}</ticks-count>  
                <gap>{{gap}}</gap> {{/if}}{{/each}} {{#each dataAxis_data}}{{#if showAxis}} 
                <serie-title>{{serie_title}}</serie-title>  
                <serie-title-color>#000000</serie-title-color>  
                <serie-title-font name="{{serie_title_fontName}}" style="{{serie_title_fontStyle}}"
                  size="{{serie_title_fontSize}}"/>  
                <serie double-axis="{{serie_double_axis}}" one-axis-location="{{serie_one_axis}}"
                  two-axis-location="{{serie_two_axis}}"/>  
                <serie-upper-margin>{{serie_upper_margin}}</serie-upper-margin>  
                <serie-number visible="{{serie_vis}}" auto="{{serie_No_auto}}" start="{{serie_No_start}}"
                  end="{{serie_No_end}}" step="{{serie_No_step}}"/>  
                <serie-number-format>{{serie_No_fm}}</serie-number-format>  
                <serie-tick-label-font name="{{serie_tick_fontName}}" style="{{serie_tick_fontStyle}}"
                  size="{{serie_tick_fontSize}}"/>  
                <serie-tick-label-color>#000000</serie-tick-label-color>{{/if}}{{/each}} {{#each horizontalganttchartdata_data}}{{#if showAxis}}
                <serie-title>{{serie_title}}</serie-title>  
                <serie-title-color>#000000</serie-title-color>  
                <serie-title-font name="{{serie_title_fontName}}" style="{{serie_title_fontStyle}}"
                  size="{{serie_title_fontSize}}"/>  
                <serie double-axis="{{serie_double_axis}}" one-axis-location="{{serie_one_axis}}"
                  two-axis-location="{{serie_two_axis}}"/>  
                <serie-tick-label-font name="{{serie_tick_fontName}}" style="{{serie_tick_fontStyle}}"
                  size="{{serie_tick_fontSize}}"/>  
                <serie-tick-label-color>#000000</serie-tick-label-color> {{/if}}{{/each}}{{#each cordon_data}}{{#if showCordon}}
                <marker visible="{{marker_visible}}" label="{{marker_label}}"
                  value="{{marker_value}}" color="#EE0000"/>  
                <marker-label-font name="{{marker_fontName}}" style="{{marker_fontStyle}}"
                  size="{{marker_fontSize}}"/>{{/if}}{{/each}}{{#each hotspot_data}}{{#if showHotSpot}}
                <map-tool-tip-label-style>{{tool_tip_label}}</map-tool-tip-label-style>  
                <map-tool-tip-format type="{{tool_tip_type}}">{{tool_tip_fm}}</map-tool-tip-format> {{/if}}{{/each}} {{#each verticalxylinechart_data}}{{#if showHotSpot}}
                <map-tool-tip-label-style>{{tool_tip_label}}</map-tool-tip-label-style>  
                <map-tool-tip-category-format type="{{tool_tip_type}}">{{tool_tip_fm}}</map-tool-tip-category-format>  
                <map-tool-tip-serie-format type="{{serie_tip_type}}">{{serie_tip_fm}}</map-tool-tip-serie-format> {{/if}}{{/each}} {{#each thermometermeterchart_data}}{{#if showType}} 
                <thermometer-range lower="{{lower}}" upper="{{upper}}"/>  
                <thermometer-units>{{units}}</thermometer-units> {{/if}}{{/each}} {{#each simplemeterchart_data}}{{#if showType}}
                <simple-range lower="0" upper="100"/>  
                <simple-interval label="" lower="0" upper="100" outline-color="#000000"
                  outline-stroke="2.0f" background-color="#0000FF"/>  
                <simple-needle-color>{{needle_color}}</simple-needle-color>  
                <simple-dial-background-color>{{dial_background}}</simple-dial-background-color>  
                <simple-dial-outline-color>{{dial_outline}}</simple-dial-outline-color>  
                <simple-meter-angle>{{meter_angle}}</simple-meter-angle>  
                <simple-tick-label-visible>{{tick_cisible}}</simple-tick-label-visible>  
                <simple-tick-label-color>{{ticklabel_color}}</simple-tick-label-color>  
                <simple-tick-size>{{tick_size}}</simple-tick-size>  
                <simple-tick-color>{{tick_color}}</simple-tick-color>  
                <simple-value-color>{{value_color}}</simple-value-color>  
                <simple-units>{{units}}</simple-units>  
                <simple-tick-label-font name="{{tick_fontName}}" style="{{tick_fontStyle}}" size="{{tick_fontSize}}"/>  
                <simple-value-font name="{{value_fontName}}" style="{{value_fontStyle}}"
                  size="{{value_fontSize}}"/> {{/if}}{{/each}} {{#each dialmeterchart_data}}{{#if showType}}
                <dial-rangle lower="0" upper="0" color="#FFFFFF"/>  
                <dial-rangle-inner-radius>{{rangle_innerradius}}</dial-rangle-inner-radius>  
                <dial-rangle-outer-radius>{{rangle_outerradius}}</dial-rangle-outer-radius>  
                <dial-dataset-index>0</dial-dataset-index>  
                <dial-view x="{{dial_viewx}}" y="{{dial_viewy}}" width="{{dial_viewwidth}}"
                  height="{{dial_viewheight}}"/>  
                <dial-frame background-color="#FFFFFF" foreground-color="#FFFFFF"/>  
                <dial-background x-color="#FFFFFF" y-color="#FFFFFF"/>  
                <dial-annotation>{{dial_annotation}}</dial-annotation>  
                <dial-annotation-font name="{{annotation_fontName}}" style="{{annotation_fontStyle}}"
                  size="{{annotation_fontSize}}"/>  
                <dial-annotation-radius>{{annotation_radius}}</dial-annotation-radius>  
                <dial-annotation-angle>{{annotation_angle}}</dial-annotation-angle>  
                <dial-value-indicator-radius>{{indicator_radius}}</dial-value-indicator-radius>  
                <dial-value-indicator-angle>{{indicator_angle}}</dial-value-indicator-angle>  
                <dial-value-indicator-font name="{{indicator_fontName}}" style="{{indicator_fontStyle}}"
                  size="{{indicator_fontSize}}"/>  
                <dial-value-indicator-color>{{indicator_outlinecolor}}</dial-value-indicator-color>  
                <dial-value-indicator-outline-color>#FFFFFF</dial-value-indicator-outline-color>  
                <dial-value-indicator-background-color>#FFFFFF</dial-value-indicator-background-color> {{/if}}{{/each}} {{#each dialmeterchartdata_data}}{{#if showData}}
                <dial-scale visible="{{scale_visible}}" lower-bound="{{lower_bound}}"
                  upper-bound="{{upper_bound}}" start-angle="{{start_angle}}" extent="{{extent}}"
                  major-tick-increment="{{major_tickcolor}}" minor-tick-count="{{minor_tickcolor}}"/>  
                <dial-scale-tick-radius>{{tick_radius}}</dial-scale-tick-radius>  
                <dial-scale-tick-label-offset>{{label_offset}}</dial-scale-tick-label-offset>  
                <dial-scale-major-tick-color>#000000</dial-scale-major-tick-color>  
                <dial-scale-minor-tick-color>#242424</dial-scale-minor-tick-color>  
                <dial-scale-tick-label-font name="{{tick_fontName}}" style="{{tick_fontStyle}}" size="{{tick_fontSize}}"/>  
                <dial-pointer-radius>{{pointer_radius}}</dial-pointer-radius>  
                <dial-pointer-width-radius>{{width_radius}}</dial-pointer-width-radius>  
                <dial-pointer-fill-color>{{pointer_fillcolor}}</dial-pointer-fill-color>  
                <dial-pointer-outline-color>{{pointer_outlinecolor}}</dial-pointer-outline-color>  
                <dial-cap-radius>0.02D</dial-cap-radius> {{/if}}{{/each}} {{#each arcdialmeterchart_data}}{{#if showData}}
                <arc-dial-rangle lower="0" upper="0" color="#FFFFFF"/>  
                <arc-dial-rangle-inner-radius>0.85D</arc-dial-rangle-inner-radius>  
                <arc-dial-rangle-outer-radius>0.86D</arc-dial-rangle-outer-radius>  
                <arc-dial-view x="{{dial_viewx}}" y="{{dial_viewy}}" width="{{dial_viewwidth}}"
                  height="{{dial_viewheight}}"/>  
                <arc-dial-frame start-angle="{{pointer_radius}}" extent="{{width_radius}}"/>  
                <arc-dial-frame-inner-radius>{{cap_radius}}</arc-dial-frame-inner-radius>  
                <arc-dial-frame-outer-radius>0.90</arc-dial-frame-outer-radius>  
                <arc-dial-frame-foreground-color>#FFFFFF</arc-dial-frame-foreground-color>  
                <arc-dial-frame-stroke>3.0f</arc-dial-frame-stroke>  
                <arc-dial-background x-color="#FFFFFF" y-color="#FFFFFF"/>  
                <arc-dial-dataset-index>0</arc-dial-dataset-index>  
                <arc-dial-scale visible="{{scale_visible}}" lower-bound="{{lower_bound}}"
                  upper-bound="{{upper_bound}}" start-angle="{{start_angle}}" extent="{{extent}}"
                  major-tick-increment="{{major_tickcolor}}" minor-tick-count="{{minor_tickcolor}}"/>  
                <arc-dial-scale-tick-radius>{{tick_radius}}</arc-dial-scale-tick-radius>  
                <arc-dial-scale-tick-label-offset>{{label_offset}}</arc-dial-scale-tick-label-offset>  
                <arc-dial-scale-major-tick-color>#000000</arc-dial-scale-major-tick-color>  
                <arc-dial-scale-minor-tick-color>#242424</arc-dial-scale-minor-tick-color>  
                <arc-dial-scale-tick-label-font name="{{tick_fontName}}" style="{{tick_fontStyle}}" size="{{tick_fontSize}}"/>  
                <arc-dial-pointer-radius>0.82</arc-dial-pointer-radius>  
                <arc-dial-pointer-color>#0000FF</arc-dial-pointer-color> {{/if}}{{/each}} {{#each other_data}}{{#if showCfg}}
                <background-color>{{bgColor}}</background-color>  
                <background-alpha>{{bgAlpha}}</background-alpha>  
                <foreground-alpha>{{pgAlpha}}</foreground-alpha>{{/if}}{{/each}}
              </config> 
            </series> 
          </series-set> 
        </chart> 
      </div> 
    </div>
</div>
