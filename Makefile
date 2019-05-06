all:
	npm run build
	electron-packager . Calculator --overwrite --icon=public/icon.icns --out="../"
