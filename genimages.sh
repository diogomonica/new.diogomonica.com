#! bash
rm ./images/timeline/*; cp ./images/timeline_original/* ./images/timeline/ ; cd ./images/timeline; sips -Z 600 *.png ; cd ../..
