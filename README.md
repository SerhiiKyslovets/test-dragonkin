# Barebones #

### Version 0.1 ###

This repository for the quick start with a new project.
Created and supported by Serhii Kyslovets with love.

### How to start with it ###

* Create new_one repository on Bitbucket

*  mkdir foo
*  cd foo
*  git clone --bare https://serhii_kyslovets@bitbucket.org/serhii_kyslovets/new_project.git
*  cd new_project.git
*  git push --mirror https://serhii_kyslovets@bitbucket.org/serhii_kyslovets/new_one.git
*  cd ..
*  cd ..
*  rm -rf foo

*  git clone https://serhii_kyslovets@bitbucket.org/serhii_kyslvoets/new_one.git

### What you need to work with it ###

* Git — version control system for tracking changes in computer files and coordinating work on those files among multiple people
* Node.js (for work with NPM)
* Gulp — toolkit for automating painful or time-consuming tasks in your development workflow
* Bower — package manager for the web

### How to run ###

* $ npm install
* $ bower install
* $ gulp

After that your project is going to run on localhost:9000

### How does it work? ###

Gulp take files from src-folder, compile it and serve from the dest-folder.

### Have a question? ###

serhii.love@gmail.com
