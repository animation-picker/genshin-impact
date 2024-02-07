
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const ALLUSERSPROFILE: string;
	export const APPCODE_VM_OPTIONS: string;
	export const APPDATA: string;
	export const CLION_VM_OPTIONS: string;
	export const COLORTERM: string;
	export const CommonProgramFiles: string;
	export const CommonProgramW6432: string;
	export const COMPUTERNAME: string;
	export const ComSpec: string;
	export const DATAGRIP_VM_OPTIONS: string;
	export const DATASPELL_VM_OPTIONS: string;
	export const DEBUG_COLORS: string;
	export const DEVECOSTUDIO_VM_OPTIONS: string;
	export const DriverData: string;
	export const DXSDK_DIR: string;
	export const EFC_10260: string;
	export const FORCE_COLOR: string;
	export const FPS_BROWSER_APP_PROFILE_STRING: string;
	export const FPS_BROWSER_USER_PROFILE_STRING: string;
	export const GATEWAY_VM_OPTIONS: string;
	export const GOLAND_VM_OPTIONS: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const IDEA_INITIAL_DIRECTORY: string;
	export const IDEA_VM_OPTIONS: string;
	export const JAVA_HOME: string;
	export const JETBRAINSCLIENT_VM_OPTIONS: string;
	export const JETBRAINS_CLIENT_VM_OPTIONS: string;
	export const LIBCLANG_PATH: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const mcversion: string;
	export const MOCHA_COLORS: string;
	export const NODE_ENV: string;
	export const npm_config_color: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const OneDrive: string;
	export const OneDriveConsumer: string;
	export const OS: string;
	export const Path: string;
	export const PATHEXT: string;
	export const PHPSTORM_VM_OPTIONS: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const ProgramData: string;
	export const ProgramFiles: string;
	export const ProgramW6432: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const PYCHARM_VM_OPTIONS: string;
	export const RIDER_VM_OPTIONS: string;
	export const RUBYMINE_VM_OPTIONS: string;
	export const SESSIONNAME: string;
	export const STUDIO_VM_OPTIONS: string;
	export const SystemDrive: string;
	export const SystemRoot: string;
	export const TEMP: string;
	export const TMP: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VIPSHOME: string;
	export const WEBIDE_VM_OPTIONS: string;
	export const WEBSTORM_VM_OPTIONS: string;
	export const windir: string;
	export const WORKON_HOME: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		ALLUSERSPROFILE: string;
		APPCODE_VM_OPTIONS: string;
		APPDATA: string;
		CLION_VM_OPTIONS: string;
		COLORTERM: string;
		CommonProgramFiles: string;
		CommonProgramW6432: string;
		COMPUTERNAME: string;
		ComSpec: string;
		DATAGRIP_VM_OPTIONS: string;
		DATASPELL_VM_OPTIONS: string;
		DEBUG_COLORS: string;
		DEVECOSTUDIO_VM_OPTIONS: string;
		DriverData: string;
		DXSDK_DIR: string;
		EFC_10260: string;
		FORCE_COLOR: string;
		FPS_BROWSER_APP_PROFILE_STRING: string;
		FPS_BROWSER_USER_PROFILE_STRING: string;
		GATEWAY_VM_OPTIONS: string;
		GOLAND_VM_OPTIONS: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		IDEA_INITIAL_DIRECTORY: string;
		IDEA_VM_OPTIONS: string;
		JAVA_HOME: string;
		JETBRAINSCLIENT_VM_OPTIONS: string;
		JETBRAINS_CLIENT_VM_OPTIONS: string;
		LIBCLANG_PATH: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		mcversion: string;
		MOCHA_COLORS: string;
		NODE_ENV: string;
		npm_config_color: string;
		NUMBER_OF_PROCESSORS: string;
		OneDrive: string;
		OneDriveConsumer: string;
		OS: string;
		Path: string;
		PATHEXT: string;
		PHPSTORM_VM_OPTIONS: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		ProgramData: string;
		ProgramFiles: string;
		ProgramW6432: string;
		PSModulePath: string;
		PUBLIC: string;
		PYCHARM_VM_OPTIONS: string;
		RIDER_VM_OPTIONS: string;
		RUBYMINE_VM_OPTIONS: string;
		SESSIONNAME: string;
		STUDIO_VM_OPTIONS: string;
		SystemDrive: string;
		SystemRoot: string;
		TEMP: string;
		TMP: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VIPSHOME: string;
		WEBIDE_VM_OPTIONS: string;
		WEBSTORM_VM_OPTIONS: string;
		windir: string;
		WORKON_HOME: string;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: string]: string | undefined;
	}
}
