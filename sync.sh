rm -rf css/* ; rm -rf _assets/sass/*.css ; rm -rf _assets/sass/*.map; sass -C --style compressed --update _assets/sass ; cp _assets/sass/*.css css/ ; cp _assets/css/* css/
rm ./images/timeline/*; cp ./images/timeline_original/* ./images/timeline/ ; cd ./images/timeline; sips -Z 300 *.png *.jpg ; cd ../..
bundle exec jekyll b
chmod -R o+rx _site/
rsync -avz -e "ssh -p 311" _site/ burly.diogomonica.com:/var/www/diogomonica.com
rm -rf css/* ; rm -rf _site/ ; rm -rf _assets/sass/*.css ; rm -rf _assets/sass/*.map
