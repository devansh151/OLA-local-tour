let colors=require('../data/constants');

class IncentiveTemplate {
  constructor(nodeData) {
    this.nodeData = nodeData;
    this._basehtml = '';
    this._baseCss = '';
    this.generateTemplate();
    this.generateCss();
    return {
      //html: this._baseCss + this._basehtml
      html: this._basehtml
    };
  }

  generateTemplate() {
      let svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="400">
    <foreignObject x="10" y="10" width="90%" height="90%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:14px">
        <div class="mat-card example-card" style="box-shadow:0 4px 7px 0 rgba(218,220,230,.6);display:block;position:relative;padding:24px;border-radius:2px;background: #fff;color:rgba(0, 0, 0, 0.87);font-family:Roboto,'Helvetica Neue',sans-serif;border:1px solid #d3d5df;">                    
            <div class="mat-card-header">
                <div class="mat-card-header-text" style="margin: 0 8px;display:inline-block;">
                    <div class="mat-card-title" style="font-size:60px;display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-bottom: 16px;font-weight: 500;"><div style="margin-right:15px;width:70px;height:70px;background:${colors.color2};display:inline-block;border-radius:35px;"></div><div style="/* margin-top:-25px; */">Incentive</div></div>
                    <div class="mat-card-subtitle" style="margin-top: -8px;display: block;margin-bottom: 16px;color: rgba(0, 0, 0, 0.54);font-size: 40px;">${this.nodeData.name}</div>
                </div>
            </div>
        </div>
    </div>
    </foreignObject>
    </svg>`
    this._basehtml = "data:image/svg+xml;charset=utf-8,"+ encodeURIComponent(svg);
  }

  generateCss(themeData) {
    this._baseCss = `
    <style type="text/css">
    </style>`;
  }
}
module.exports = IncentiveTemplate;