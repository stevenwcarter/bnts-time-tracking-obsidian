
import {
	App,
	MarkdownPostProcessorContext,
	MarkdownRenderChild,
  } from "obsidian";
  import { h, createContext, ComponentChildren, render, Fragment } from "preact";
  import { unmountComponentAtNode } from "preact/compat";

  export default class TimeTrackingInjector {
	private app: App;
  
	constructor(app: App) {
	  this.app = app;
	}
  
	onNewBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
	  const pendingQuery = {
		source: source,
		target: el,
		ctx: ctx,
	  };
  
	  this.injectQuery(pendingQuery);
	}
  
  
	injectQuery(pendingQuery: PendingQuery) {
	  let query: Result<IQuery, Error> = null;

  
	  pendingQuery.ctx.addChild(child);
	}
  }
  
  interface PendingQuery {
	source: string;
	target: HTMLElement;
	ctx: MarkdownPostProcessorContext;
  }
  

