const enhancerTemplate = require('./enhancer-template');
const constraintTemplate = require('./constraint-template');
const incentiveTemplate = require('./incentive-template');
const mbgTemplate = require('./mbg-template');
const filterTemplate = require('./filter-template');
const operatorTemplate = require('./operator-template');
const switchTemplate = require('./switch-template');
const conditionTemplate = require('./condition-template');
const latchTemplate = require('./latch-template');
const mergerTemplate = require('./merger-template');


class GraphNode {
	constructor(nodeData) {
		let nodeBody = this.createNodeBody(nodeData);
		return { nodeBody : nodeBody};
    }
    
	createNodeBody(nodeData) {
		let nodeBody = '';
		switch (nodeData.group) {
			case 'enhancers':
				nodeBody = new enhancerTemplate(nodeData);
				break;
            case 'constraints':
				nodeBody = new constraintTemplate(nodeData);
                break;
            case 'incentives':
				nodeBody = new incentiveTemplate(nodeData);
                break;
            case 'mbg':
				nodeBody = new mbgTemplate(nodeData);
				break;
			case 'filters':
				nodeBody = new filterTemplate(nodeData);
				break;
            case 'operators':
				nodeBody = new operatorTemplate(nodeData);
                break;
            case 'switch':
				nodeBody = new switchTemplate(nodeData);
				break;
			case 'conditions':
				nodeBody = new conditionTemplate(nodeData);
				break;
            case 'latch':
				nodeBody = new latchTemplate(nodeData);
                break;
            case 'mergers':
				nodeBody = new mergerTemplate(nodeData);
                break;

			default:
				break;
		}
		return nodeBody;
	}
}

module.exports = GraphNode;