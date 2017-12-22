visualisationdata:
	python process_whiskies.py

geo:
	unzip -n geo/GBR_adm.zip -d geo
	shp2json geo/GBR_adm0.shp -o geo/uk.json
	# geoproject 'd3.geoAiry().fitSize([960, 960], d)' < geo/uk.json > geo/uk-proj.json
	ndjson-split 'd.features' \
		< geo/uk.json > geo/uk-proj.ndjson
	geo2topo -n \
		tracts=geo/uk-proj.ndjson \
		> geo/uk-topo.ndjson
	toposimplify -p 0.0001 -f \
		< geo/uk-topo.ndjson \
		> geo/uk-simple.ndjson
	topoquantize 1e5 \
		< geo/uk-simple.ndjson \
		> geo/uk-quantised.ndjson
	cp geo/uk-quantised.ndjson whisky-vis/src/geo.json
	geo2svg -w 960 -h 960 < geo/uk-quantised.ndjson > geo/uk.svg

convertrivershapefiletojson:
	ogr2ogr geo/data/wgs84_watercourse.shp \
		geo/data/WatercourseLink.shp \
		-t_srs \
		"+proj=longlat +ellps=WGS84 +no_defs +towgs84=0,0,0"
	shp2json geo/data/wgs84_watercourse.shp -o geo/rivers.json
	ndjson-split 'd.features' \
		< geo/rivers.json > geo/rivers-proj.ndjson
	ndjson-filter 'd.properties.name1 === "River Spey"' \
		< geo/rivers-proj.ndjson > geo/river-spey.ndjson

rivers:
	geo2topo -n \
		tracts=geo/river-spey.ndjson \
		> geo/rivers-topo.ndjson
	topoquantize 1e5 \
		< geo/rivers-topo.ndjson \
		> geo/rivers-quantised.ndjson
	cp geo/rivers-topo.ndjson whisky-vis/src/rivers.json
