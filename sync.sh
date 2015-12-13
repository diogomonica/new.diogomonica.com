rm ./images/timeline/*; cp ./images/timeline_original/* ./images/timeline/ ; cd ./images/timeline; sips -Z 300 *.png *.jpg ; cd ../..
bundle exec jekyll b; rsync -avz -e "ssh -p 311" _site/ bear.diogomonica.com:/var/www/diogomonica.com
