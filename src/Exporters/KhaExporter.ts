import * as path from 'path';
import {convert} from '../Converter';
import {Exporter} from './Exporter';
import {Options} from '../Options';
import {Library} from '../Project';

export abstract class KhaExporter extends Exporter {
	width: number;
	height: number;
	sources: string[];
	libraries: Library[];
	name: string;
	safename: string;
	options: Options;
	projectFiles: boolean;
	parameters: string[];
	systemDirectory: string;

	constructor(options: Options) {
		super();
		this.options = options;
		this.width = 640;
		this.height = 480;
		this.sources = [];
		this.libraries = [];
		this.addSourceDirectory(path.join(options.kha, 'Sources'));
		this.projectFiles = !options.noproject;
		this.parameters = [];
		// this.parameters = ['--macro kha.internal.GraphicsBuilder.build("' + this.backend().toLowerCase() + '")'];
		this.addSourceDirectory(path.join(options.kha, 'Backends', this.backend()));
	}

	sysdir(): string {
		return this.systemDirectory;
	}

	abstract backend(): string;

	abstract haxeOptions(name: string, targetOptions: any, defines: Array<string>): any;

	async export(name: string, targetOptions: any, haxeOptions: any): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			reject('Called an abstract function');
		});
	}

	setWidthAndHeight(width: number, height: number): void {
		this.width = width;
		this.height = height;
	}

	setName(name: string): void {
		this.name = name;
		this.safename = name.replace(/ /g, '-');
	}

	setSystemDirectory(systemDirectory: string): void {
		this.systemDirectory = systemDirectory;
	}

	addShader(shader: string): void {

	}

	addSourceDirectory(path: string): void {
		this.sources.push(path);
	}

	addLibrary(library: Library): void {
		this.libraries.push(library);
	}

	removeSourceDirectory(path: string): void {
		for (let i = 0; i < this.sources.length; ++i) {
			if (this.sources[i] === path) {
				this.sources.splice(i, 1);
				return;
			}
		}
	}

	async copyImage(platform: string, from: string, to: string, options: any, cache: any): Promise<{ files: Array<string>, sizes: Array<number>}> {
		return {files: [], sizes: []};
	}

	async copySound(platform: string, from: string, to: string, options: any): Promise<{ files: Array<string>, sizes: Array<number>}> {
		return {files: [], sizes: []};
	}

	async copyVideo(platform: string, from: string, to: string, options: any): Promise<{ files: Array<string>, sizes: Array<number>}> {
		return {files: [], sizes: []};
	}

	async copyBlob(platform: string, from: string, to: string, options: any): Promise<{ files: Array<string>, sizes: Array<number>}> {
		return {files: [], sizes: []};
	}

	async copyFont(platform: string, from: string, to: string, options: any): Promise<{ files: Array<string>, sizes: Array<number>}> {
		return await this.copyBlob(platform, from, to + '.ttf', options);
	}
}
