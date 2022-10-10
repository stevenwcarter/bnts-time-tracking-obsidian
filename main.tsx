import React from 'react';
import { App, Component, Editor, MarkdownPostProcessorContext, MarkdownRenderChild, MarkdownView, Modal, Notice, Plugin, PluginManifest, PluginSettingTab, Setting } from 'obsidian';
import { TimeTrackingReport } from './TimeTrackingReport';
import { createRoot } from 'react-dom/client';
import { unmountComponentAtNode } from 'react-dom';

interface BTTPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: BTTPluginSettings = {
	mySetting: 'default'
}

function 	isDataviewDisabled(sourcePath: string): boolean {
	let questionLocation = sourcePath.lastIndexOf("?");
	if (questionLocation == -1) return false;

	return sourcePath.substring(questionLocation).contains("no-dataview");
}

function renderCodeBlock(container: HTMLElement, source: string, language?: string): HTMLElement {
    let code = container.createEl("code", { cls: ["timetracking"] });
    if (language) code.classList.add("language-" + language);
    code.appendText(source);
    return code;
}

export function createTimeTrackingView(init: any, source: any): MarkdownRenderChild {
    return new ReactRenderer(init, <TimeTrackingReport source={source} />);
}

export default class BTTPlugin extends Plugin {
	settings: BTTPluginSettings;


	constructor (app: App, pluginManifest: PluginManifest) {
		super(app, pluginManifest);

	};

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor("timetracking", async (source: string, el, ctx) => this.timetracking(source, el, ctx, ctx.sourcePath));
	}


	public async timetracking(
		source: string,
		el: HTMLElement,
		component: Component | MarkdownPostProcessorContext,
		sourcePath: string
	) {
		this.execute(source, el, component, sourcePath);
	}

	public async execute(
        source: string,
        container: HTMLElement,
        component: Component | MarkdownPostProcessorContext,
        filePath: string
    ) {
        if (isDataviewDisabled(filePath)) {
            renderCodeBlock(container, source);
            return;
        }

		let init = { app: this.app, settings: this.settings, container };
		component.addChild(createTimeTrackingView(init, source))
	}



	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

export class ReactRenderer extends MarkdownRenderChild {
	root: any;

    public constructor(public init: any, public element: JSX.Element) {
        super(init.container);
    }

    public onload(): void {
        const context = Object.assign({}, { component: this }, this.init);
		this.root = createRoot(this.containerEl);
        this.root.render(this.element);
    }

    public onunload(): void {
		this.root.unmount();
    }
}
