declare module 'fse' {
	/**
	* Valid types for path values in "fs".
	*/
	type PathLike = string | Buffer | URL;

	type WriteFileOptions = { encoding?: string | null; mode?: number | string; flag?: string; } | string | null;

	/**
	* Tests a user's permissions for the file specified by path.
	* @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function access ( path: PathLike, mode?: number): Promise<void>;

	/**
	* Tests a user's permissions for the file specified by path.
	* @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function accessSync ( path: PathLike, mode?: number): void;

	/**
	* Appends data to a file, creating the file if it does not exist.
	* @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
	* @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
	* If `encoding` is not supplied, the default of `'utf8'` is used.
	* If `mode` is not supplied, the default of `0o666` is used.
	* If `mode` is a string, it is parsed as an octal integer.
	* If `flag` is not supplied, the default of `'a'` is used.
	*/
	function appendFile (file: PathLike | number, data: any, options?: WriteFileOptions): Promise<void>;

	/**
	* Appends data to a file, creating the file if it does not exist.
	* @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
	* @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
	* If `encoding` is not supplied, the default of `'utf8'` is used.
	* If `mode` is not supplied, the default of `0o666` is used.
	* If `mode` is a string, it is parsed as an octal integer.
	* If `flag` is not supplied, the default of `'a'` is used.
	*/
	function appendFileSync (file: PathLike | number, data: any, options?: WriteFileOptions): void;

	/**
	* Changes the permissions of a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer.
	*/
	function chmod (path: PathLike, mode: string | number): Promise<void>;

	/**
	* Changes the permissions of a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer.
	*/
	function chmodSync (path: PathLike, mode: string | number): void;

	/**
	* Changes the ownership of a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function chown (path: PathLike, uid: number, gid: number): Promise<void>;

	/**
	* Changes the ownership of a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function chownSync (path: PathLike, uid: number, gid: number): void;

	/**
	* Closes a file descriptor.
	* @param fd A file descriptor.
	*/
	function close (fd: number): Promise<void>;

	/**
	* Closes a file descriptor.
	* @param fd A file descriptor.
	*/
	function closeSync (fd: number): void;

	/**
	* Tests whether or not the given path exists by checking with the file system.
	* @deprecated
	* @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function exists (path: PathLike): Promise<boolean>;

	/**
	* Tests whether or not the given path exists by checking with the file system.
	* @deprecated
	* @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function existsSync (path: PathLike): boolean;

	/**
	* Changes the permissions of a file.
	* @param fd A file descriptor.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer.
	*/
	function fchmod (fd: number, mode: string | number): Promise<void>;

	/**
	* Changes the permissions of a file.
	* @param fd A file descriptor.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer.
	*/
	function fchmodSync (fd: number, mode: string | number): void;

	/**
	* Changes the ownership of a file.
	* @param fd A file descriptor.
	*/
	function fchown (fd: number, uid: number, gid: number): Promise<void>;

	/**
	* Changes the ownership of a file.
	* @param fd A file descriptor.
	*/
	function fchownSync (fd: number, uid: number, gid: number): void;

	/**
	* Synchronizes a file's in-core state with storage device.
	* @param fd A file descriptor.
	*/
	function fdatasync (fd: number): Promise<void>;

	/**
	* Synchronizes a file's in-core state with storage device.
	* @param fd A file descriptor.
	*/
	function fdatasyncSync (fd: number): void;

	/**
	* Gets a file status.
	* @param fd A file descriptor.
	*/
	function fstat (fd: number): Promise<void>;

	/**
	* Gets a file status.
	* @param fd A file descriptor.
	*/
	function fstatSync (fd: number): void;

	/**
	* Synchronizes a file's in-core state with the underlying storage device.
	* @param fd A file descriptor.
	*/
	function fsync (fd: number): Promise<void>;

	/**
	* Synchronizes a file's in-core state with the underlying storage device.
	* @param fd A file descriptor.
	*/
	function fsyncSync (fd: number): void;

	/**
	* Truncates a file to a specified length.
	* @param fd A file descriptor.
	* @param len If not specified, defaults to `0`.
	*/
	function ftruncate (fd: number, len: number | undefined | null): Promise<void>;

	/**
	* Truncates a file to a specified length.
	* @param fd A file descriptor.
	* @param len If not specified, defaults to `0`.
	*/
	function ftruncateSync (fd: number, len: number | undefined | null): void;

	/**
	* Changes the file timestamps of the file referenced by the supplied file descriptor.
	* @param fd A file descriptor.
	* @param atime The last access time. If a string is provided, it will be coerced to number.
	* @param mtime The last modified time. If a string is provided, it will be coerced to number.
	*/
	function futimes (fd: number, atime: string | number | Date, mtime: string | number | Date): Promise<void>;

	/**
	* Changes the file timestamps of the file referenced by the supplied file descriptor.
	* @param fd A file descriptor.
	* @param atime The last access time. If a string is provided, it will be coerced to number.
	* @param mtime The last modified time. If a string is provided, it will be coerced to number.
	*/
	function futimesSync (fd: number, atime: string | number | Date, mtime: string | number | Date): void;

	/**
	* Changes the permissions of a file. Does not dereference symbolic links.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer.
	*/
	function lchmod (path: PathLike, mode: string | number): Promise<void>;

	/**
	* Changes the permissions of a file. Does not dereference symbolic links.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer.
	*/
	function lchmodSync (path: PathLike, mode: string | number): void;

	/**
	* Changes the ownership of a file. Does not dereference symbolic links.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function lchown (path: PathLike, uid: number, gid: number): Promise<void>;

	/**
	* Changes the ownership of a file. Does not dereference symbolic links.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function lchownSync (path: PathLike, uid: number, gid: number): void;

	/**
	* Creates a new link (also known as a hard link) to an existing file.
	* @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function link (existingPath: PathLike, newPath: PathLike): Promise<void>;

	/**
	* Creates a new link (also known as a hard link) to an existing file.
	* @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function linkSync (existingPath: PathLike, newPath: PathLike): void;

	/**
	* Gets the file status. Does not dereference symbolic links.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function lstat (path: PathLike): Promise<Stats>;

	/**
	* Gets the file status. Does not dereference symbolic links.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function lstatSync (path: PathLike): Stats;

	/**
	* Creates a unique temporary directory.
	* Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function mkdtemp (prefix: string, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): Promise<void>;

	/**
	* Creates a unique temporary directory.
	* Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function mkdtempSync (prefix: string, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): void;

	/**
	* Opens and possibly creates a file, returning a file descriptor.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not supplied, defaults to `0o666`.
	*/
	function open (path: PathLike, flags: string | number, mode?: string | number | null): Promise<void>;

	/**
	* Opens and possibly creates a file, returning a file descriptor.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not supplied, defaults to `0o666`.
	*/
	function openSync (path: PathLike, flags: string | number, mode?: string | number | null): void;

	/**
	* Reads data from the file referenced by the supplied file descriptor, returning the number of bytes read.
	* @param fd A file descriptor.
	* @param buffer The buffer that the data will be written to.
	* @param offset The offset in the buffer at which to start writing.
	* @param length The number of bytes to read.
	* @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
	*/
	function read (fd: number, buffer: BinaryData, offset: number, length: number, position: number | null): Promise<number>;

	/**
	* Reads data from the file referenced by the supplied file descriptor, returning the number of bytes read.
	* @param fd A file descriptor.
	* @param buffer The buffer that the data will be written to.
	* @param offset The offset in the buffer at which to start writing.
	* @param length The number of bytes to read.
	* @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
	*/
	function readSync (fd: number, buffer: BinaryData, offset: number, length: number, position: number | null): number;

	/**
	* Reads a directory.
	* @param path A path to a directory. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function readdir (path: PathLike, options?: { encoding: BufferEncoding | null; withFileTypes?: false } | BufferEncoding | null): Promise<string[]>;
	function readdir (path: PathLike, options: { encoding: "buffer"; withFileTypes?: false } | "buffer"): Promise<Buffer[]>;
	function readdir (path: PathLike, options?: { encoding?: string | null; withFileTypes?: false } | string | null): Promise<string[]> | Promise<Buffer[]>;
	function readdir (path: PathLike, options: { encoding?: string | null; withFileTypes: true }): Promise<Dirent[]>;

	/**
	* Reads a directory.
	* @param path A path to a directory. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function readdirSync (path: PathLike, options?: { encoding: BufferEncoding | null; withFileTypes?: false } | BufferEncoding | null): string[];
	function readdirSync (path: PathLike, options: { encoding: "buffer"; withFileTypes?: false } | "buffer"): Buffer[];
	function readdirSync (path: PathLike, options?: { encoding?: string | null; withFileTypes?: false } | string | null): string[] | Buffer[];
	function readdirSync (path: PathLike, options: { encoding?: string | null; withFileTypes: true }): Dirent[];

	/**
	* Reads the entire contents of a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function readFile (path: PathLike | number, options?: { encoding?: null; flag?: string; } | null): Promise<Buffer>;
	function readFile (path: PathLike | number, options: { encoding: string; flag?: string; } | string): Promise<string>;
	function readFile (path: PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | null): Promise<string> | Promise<Buffer>;

	/**
	* Reads the entire contents of a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function readFileSync (path: PathLike | number, options?: { encoding?: null; flag?: string; } | null): Buffer;
	function readFileSync (path: PathLike | number, options: { encoding: string; flag?: string; } | string): string;
	function readFileSync (path: PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | null): string | Buffer;

	/**
	* Reads the value of a symbolic link.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function readlink (path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): Promise<string>;
	function readlink (path: PathLike, options: { encoding: "buffer" } | "buffer"): Promise<Buffer>;
	function readlink (path: PathLike, options?: { encoding?: string | null } | string | null): Promise<string> | Promise<Buffer>;

	/**
	* Reads the value of a symbolic link.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function readlinkSync (path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;
	function readlinkSync (path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;
	function readlinkSync (path: PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;

	/**
	* Returns the canonicalized absolute pathname
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function realpath (path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): Promise<string>;
	function realpath (path: PathLike, options: { encoding: "buffer" } | "buffer"): Promise<Buffer>;
	function realpath (path: PathLike, options?: { encoding?: string | null } | string | null): Promise<string> | Promise<Buffer>;

	/**
	* Returns the canonicalized absolute pathname
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
	*/
	function realpathSync (path: PathLike, options?: { encoding?: BufferEncoding | null } | BufferEncoding | null): string;
	function realpathSync (path: PathLike, options: { encoding: "buffer" } | "buffer"): Buffer;
	function realpathSync (path: PathLike, options?: { encoding?: string | null } | string | null): string | Buffer;

	/**
	* Changes the name or location of a file or directory.
	* @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function rename (oldPath: PathLike, newPath: PathLike): Promise<void>;

	/**
	* Changes the name or location of a file or directory.
	* @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function renameSync (oldPath: PathLike, newPath: PathLike): void;

	/**
	* Gets the file status.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function stat (path: PathLike): Promise<void>;

	/**
	* Gets the file status.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function statSync (path: PathLike): void;

	/**
	* Creates a new symbolic link to an existing file.
	* @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
	* @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
	* @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
	*/
	function symlink (target: PathLike, path: PathLike, type?: symlink.Type | null): Promise<void>;

	/**
	* Creates a new symbolic link to an existing file.
	* @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
	* @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
	* @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
	*/
	function symlinkSync (target: PathLike, path: PathLike, type?: symlink.Type | null): void;

	/**
	* Truncates a file to a specified length.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param len If not specified, defaults to `0`.
	*/
	function truncate (path: PathLike, len?: number | null): Promise<void>;

	/**
	* Truncates a file to a specified length.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param len If not specified, defaults to `0`.
	*/
	function truncateSync (path: PathLike, len?: number | null): void;

	/**
	* Deletes a name and possibly the file it refers to.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function unlink (path: PathLike): Promise<void>;

	/**
	* Deletes a name and possibly the file it refers to.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function unlinkSync (path: PathLike): void;

	/**
	* Changes the timestamps of the file referenced by the supplied path.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param atime The last access time. If a string is provided, it will be coerced to number.
	* @param mtime The last modified time. If a string is provided, it will be coerced to number.
	*/
	function utimes (path: PathLike, atime: string | number | Date, mtime: string | number | Date): Promise<void>;

	/**
	* Changes the timestamps of the file referenced by the supplied path.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param atime The last access time. If a string is provided, it will be coerced to number.
	* @param mtime The last modified time. If a string is provided, it will be coerced to number.
	*/
	function utimesSync (path: PathLike, atime: string | number | Date, mtime: string | number | Date): void;

	/**
	* Writes data to a file, replacing the file if it already exists.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
	* @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
	* If `encoding` is not supplied, the default of `'utf8'` is used.
	* If `mode` is not supplied, the default of `0o666` is used.
	* If `mode` is a string, it is parsed as an octal integer.
	* If `flag` is not supplied, the default of `'w'` is used.
	*/
	function writeFile (path: PathLike | number, data: any, options: WriteFileOptions): Promise<void>;

	/**
	* Writes data to a file, replacing the file if it already exists.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
	* @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
	* If `encoding` is not supplied, the default of `'utf8'` is used.
	* If `mode` is not supplied, the default of `0o666` is used.
	* If `mode` is a string, it is parsed as an octal integer.
	* If `flag` is not supplied, the default of `'w'` is used.
	*/
	function writeFileSync (path: PathLike | number, data: any, options: WriteFileOptions): void;

	/**
	* Copys a directory and its contents.
	* @param path A path to a directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function copydir (path: PathLike | number): Promise<void>;

	/**
	* Copys a directory and its contents.
	* @param path A path to a directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function copydirSync (path: PathLike | number): void;

	/**
	* Copys a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function copyFile (path: PathLike | number): Promise<void>;

	/**
	* Copys a file.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function copyFileSync (path: PathLike | number): void;

	/**
	* Reads the entire contents of a JSON file and parses it into an object.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function readJson (path: PathLike | number): Promise<any>;

	/**
	* Reads the entire contents of a JSON file and parses it into an object.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function readJsonSync (path: PathLike | number): Promise<any>;

	/**
	* Deletes a directory and its contents.
	* @param path A path to a directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function rmdir (path: PathLike | number): Promise<void>;

	/**
	* Deletes a directory and its contents.
	* @param path A path to a directory. If a URL is provided, it must use the `file:` protocol.
	*/
	function rmdirSync (path: PathLike | number): void;

	/**
	* Opens and saves a file without any changes, creating the file if it does not exist.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function touchFile (path: PathLike | number): Promise<void>;

	/**
	* Opens and saves a file without any changes, creating the file if it does not exist.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function touchFileSync (path: PathLike | number): void;

	/*
	* Returns a new `ReadStream` object.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	*/
	function createReadStream (path: PathLike, options?: string | {
		flags?: string;
		encoding?: string;
		fd?: number;
		mode?: number;
		autoClose?: boolean;
		start?: number;
		end?: number;
		highWaterMark?: number;
	}): ReadStream;

	/*
	* Returns a new `WriteStream` object.
	* @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
	* URL support is _experimental_.
	*/
	function createWriteStream (path: PathLike, options?: string | {
		flags?: string;
		encoding?: string;
		fd?: number;
		mode?: number;
		autoClose?: boolean;
		start?: number;
	}): WriteStream;

	/**
	* Stops watching for changes on `filename`.
	* @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
	* URL support is _experimental_.
	*/
	function unwatchFile (filename: PathLike, listener?: (curr: Stats, prev: Stats) => void): void;

	/**
	* Watches for changes on `filename`, where `filename` is either a file or a directory, returning an `FSWatcher`.
	* @param filename A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
	* @param options Either the encoding for the filename provided to the listener, or an object optionally specifying encoding, persistent, and recursive options.
	* If `encoding` is not supplied, the default of `'utf8'` is used.
	* If `persistent` is not supplied, the default of `true` is used.
	* If `recursive` is not supplied, the default of `false` is used.
	*/
	function watch (
		filename: PathLike,
		options: { encoding?: BufferEncoding | null, persistent?: boolean, recursive?: boolean } | BufferEncoding | undefined | null,
		listener?: (event: string, filename: string) => void,
	): FSWatcher;
	function watch (filename: PathLike, options: { encoding: "buffer", persistent?: boolean, recursive?: boolean } | "buffer", listener?: (event: string, filename: Buffer) => void): FSWatcher;
	function watch (
		filename: PathLike,
		options: { encoding?: string | null, persistent?: boolean, recursive?: boolean } | string | null,
		listener?: (event: string, filename: string | Buffer) => void,
	): FSWatcher;
	function watch (filename: PathLike, listener?: (event: string, filename: string) => any): FSWatcher;

	/**
	* Watches for changes on `filename`. The callback `listener` will be called each time the file is accessed.
	*/
	function watchFile (filename: PathLike, options: { persistent?: boolean; interval?: number; } | undefined, listener: (curr: Stats, prev: Stats) => void): void;
	function watchFile (filename: PathLike, listener: (curr: Stats, prev: Stats) => void): void;
}
