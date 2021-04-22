<p align="center">
<a href="https://dscvit.com">
	<img src="https://user-images.githubusercontent.com/30529572/72455010-fb38d400-37e7-11ea-9c1e-8cdeb5f5906e.png" />
</a>
	<h2 align="center"> Song Story Frontend </h2>
</p>

---
[![DOCS](https://img.shields.io/badge/Documentation-see%20docs-green?style=flat-square&logo=appveyor)](INSERT_LINK_FOR_DOCS_HERE) 
  [![UI ](https://img.shields.io/badge/User%20Interface-Link%20to%20UI-orange?style=flat-square&logo=appveyor)](INSERT_UI_LINK_HERE)


## Functionalities
- [x]  Generate Story based on prompt
- [x]  Generate Prompt based on keywords
- [x]  Generate Keywords based on Artist
- [x]  Typing test for the Story generated

<br>


## Instructions to run


Install the dependencies using

```
npm install
```
You will have to create a Genius API Access Token that you can get from the link below: https://docs.genius.com/

After obtaining the key, we have to add it to server/.env file with ACCESS_TOKEN header, like so
![image](https://user-images.githubusercontent.com/34500350/115106691-e23b4780-9f83-11eb-8297-0a66ed81cbe5.png)


Download the models using the drive link below and place them in server/models:<br>
https://drive.google.com/drive/folders/1i3-l4cfmcCZO36Cst_YOVZY4LaCMQw0k?usp=sharing

To run the dev version:
```
npm start
```

To create executables run either of the following according to your platform:

```
npm run package-mac
npm run package-linux
npm run package-win
```
You will have your app in the release-builds folder.

## Contributors

<table>
<tr align="center">


<td>

Prakhar Soni

<p align="center">
<img src = "https://dscvit.com/images/dsc-logo-square.svg" width="150" height="150" alt="Your Name Here (Insert Your Image Link In Src">
</p>
<p align="center">
<a href = "https://github.com/prakhar0912"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/prakhar-soni-223a9b189/">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
</td>

</tr>
  </table>

<br>
<br>

<p align="center">
	Made with :heart: by <a href="https://dscvit.com">DSC VIT</a>
</p>

