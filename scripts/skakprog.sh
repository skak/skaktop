#!/bin/bash
# script to install all my useful treats and tricks
# mostly just awesomewm atm
# skak - 21 12 2012
# for my dog Bailey
# rip buddy, 17 12 2012
# make sure to "sudo chmod +x skakprog.sh"
# IFS= RESETS INPUT

IFS=
SKAK="SFDASWE"
if [ "$UID" -ne "0" ]; then
	echo "------:[ Hello sir. You're going to need root if you want to run this script."
	exit 1

elif [ "$UID" -eq "0" ]; then
	echo "------:[ It would appear as though you have root."
	sleep 1
	echo "------:[ Carrying on."
	clear
# fi goes at end of script, after the SKAKwhile done

while [ "$SKAK" != "Q" -a "$SKAK" != "q" ]
					do
#	echo "[    ]:[                                        ]:------"
	echo " XXXXXX[SKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAK]XXXXXX "
	echo "X?????:[SKAKSKAKSKAKSKAK# SKAK #SKAKSKAKSKAKSKAK]:!!!!!X"
	echo "X?????:[SKAK---------> /\/\3/\/|_| <--------SKAK]:!!!!!X"
	echo " XXXXXX[SKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAK]XXXXXX "
	echo "[????]:[<-----TYPE SEQUENCE ON LEFT, PRESS RET  ]:WEIGHT"
	echo "---[1]:[      *UPDATE,AUTOREMOVE,UPGRADE*       ]:!!!!!!"
	echo "[DAWM]:[      DL/INSTALL AWESOMEWM BINARY       ]:    !!"
	echo "[CONF]:[       STARTER CONFIG AWESOMEWM         ]:  !!!!"
	echo "-------[----------------------------------------]-------"
	echo "[DLCI]:[           GET CHECKINSTALL             ]: !!!!!"
	echo "[LIBX]:[      INSTALL AWESOMEWM DEP LIBS        ]: !!!!!"
	echo "[HUGE]:[      INSTALL AWESOMEWM LARGE DEP       ]: !!!!!"
	echo "[XTRA]:[      INSTALL AWESOMEWM EXTRA DEP       ]: !!!!!"
	echo "[ASRC]:[       COMPILE,INSTALL AWESOMEWM        ]:!!!!!!"
	echo "       [----------------------------------------]       "
	echo "[NVID]:[     INSTALL CURRENT DEV VID DRIVER     ]:   !!!"
	echo "---[Q]:[                  QUIT                  ]:     !"
	echo "   [R]:[               SKAKS APPS               ]:------"
	read CHOOSER
		#	echo "[    ]:[                                        ]:------"
			case "$CHOOSER" in
			R)
				SKAKK="SLDKFJ"
				while [ "$SKAKK" != "B" -a "$SKAKK" != "b" ]
									do
#				echo "[    ]:[                                        ]:------"
				echo " XXXXXX[SKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAK]XXXXXX "
				echo "X?????:[SKAKSKAKSKAKSKAK# SKAK #SKAKSKAKSKAKSKAK]:!!!!!X"
				echo "X?????:[SKAK------------> 4995 <------------SKAK]:!!!!!X"
				echo " XXXXXX[SKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAKSKAK]XXXXXX "
				echo "[   B]:[ RETURNS TO MAIN MENU                   ]:------"
				echo "[GVIM]:[ INSTALL GTK VIM TEXT EDITOR            ]:------"
				echo "[TERM]:[ INSTALL TERMINATOR TERMINAL EMULATOR   ]:------"
				echo "[GOGL]:[ INSTALL GOOGLE CHROME BROWSER          ]:------"
				echo "[OSPB]:[ OS-PROBER FOR GRUB(2)                  ]:------"
				echo "[    ]:[                                        ]:------"
				echo "[    ]:[                                        ]:------"
				echo "[    ]:[                                        ]:------"
				read CHOOSERR
					case "$CHOOSERR" in
						B)
							echo "See you at the usual location, sir."
							sleep 2
							clear
							SKAKK="B"
						;;
						
						GVIM)
							echo "Installing gtk-vim package, only real linux nerds use vim."
							apt-get install gtk-vim
							echo "It is done, sir."
							sleep 2
							clear
						;;
						
						TERM)
							echo "Installing terminator terminal emulator."
							echo "It really does kick ass, sir."
							apt-get install terminator
							echo "It is done, sir."
							sleep 2
							clear
						;;
						
						GOGL)
							echo "THIS SECTION IS NOT TRUTHFUL ABOUT WHAT IT'S DOING"
							echo "TECHNICALLY IT DOES NOTHING YET"
							echo "Installing google chrome internet browser."
							echo "Enjoy."
							echo "Install the extension adblockplus. You won't be disappointed."
						;;
						
						OSPB)
							echo "Installing OS-Prober for grub(2), sir."
							apt-get -syy install os-prober
							echo "Seems to have finished. Good day."
							sleep 2
							clear
						;;
					esac
				done
			;;
			
			Q)
				echo "Thank you, sir."
				sleep 3
				clear
				exit 0
			;;
			
			q)
				echo "Thank you, sir."
				sleep 3
				clear
				exit 0
			;;
				
			1)
				echo "Update, Autoremove, Upgrade."
				echo "You will only be notified of errors."
				echo "Continue for sure? (Y/N)"
				read YN
				if [ "$YN" = "y" -o "$YN" = "Y" ]; then
					# basic todo before installing things
					apt-get -yqq update
					apt-get -yqq autoremove
					apt-get -yqq upgrade
				else
					echo "Please be careful when making a selection."
					YN=""
				fi
				clear
			;;
			
			DLCI)
				echo "Installing CheckInstall."
				echo "You will only be notified of errors."
				apt-get -yqq install checkinstall
				clear
			;;
			
			LIBX)
				echo "Installing many libs. PLEASE WAIT."
				echo "You will only be notified of errors."
				apt-get -yqq install libc6 #  Depends: libc6
				apt-get -yqq install libcairo2 #  Depends: libcairo2
				apt-get -yqq install libdbus-1-3 #  Depends: libdbus-1-3
				apt-get -yqq install libev4 #  Depends: libev4
				apt-get -yqq install libglib2.0-0 #  Depends: libglib2.0-0
				apt-get -yqq install libimlib2 #  Depends: libimlib2
				apt-get -yqq install liblua5.1-0 #  Depends: liblua5.1-0
				apt-get -yqq install libpango1.0-0 #  Depends: libpango1.0-0
				apt-get -yqq install libstartup-notification0 #  Depends: libstartup-notification0
				apt-get -yqq install libx11-6 #  Depends: libx11-6
				apt-get -yqq install libxcb-icccm4 #  Depends: libxcb-icccm4
				apt-get -yqq install libxcb-image0 #  Depends: libxcb-image0
				apt-get -yqq install libxcb-keysyms1 #  Depends: libxcb-keysyms1
				apt-get -yqq install libxcb-randr0 #  Depends: libxcb-randr0
				apt-get -yqq install libxcb-shape0 #  Depends: libxcb-shape0
				apt-get -yqq install libxcb-util0 #  Depends: libxcb-util0
				apt-get -yqq install libxcb-xinerama0 #  Depends: libxcb-xinerama0
				apt-get -yqq install libxcb-xtest0 #  Depends: libxcb-xtest0
				apt-get -yqq install libxcb1 #  Depends: libxcb1
				apt-get -yqq install libxdg-basedir1 #  Depends: libxdg-basedir1
				apt-get -yqq install menu #  Depends: menu
				apt-get -yqq install dbus-x11 #  Depends: dbus-x11
							      #           dbus-x11:i386
				apt-get -yqq install x11-xserver-utils #  Recommends: x11-xserver-utils
				apt-get -yqq install rlwrap #  Recommends: rlwrap
				apt-get -yqq install feh #  Recommends: feh
				apt-get -yqq install lua-lgi-dev # Compile Dep
						   # lua-lgi-dev:i386 # Compile Dep
				clear
			;;
				##########################################
				########  Conflicts: awesome:i386 ########
				##########################################			
			HUGE)
				echo "Installing LARGE FILE SIZE deps for awesomewm. PLEASE WAIT AWHILE."
				echo "Estimated 45 minutes on broadband cable."
				echo "You will only be notified of errors."
				apt-get -yqq install build-essential
				apt-get -yqq install asciidoc
				apt-get -yqq install xmlto
				apt-get -yqq install doxygen
				apt-get -yqq install wget
				apt-get -yqq install cmake
				apt-get -yqq install git
				apt-get -yqq install gperf
				apt-get -yqq install lua50
				apt-get -yqq install luadoc
				apt-get -yqq install imagemagick
				clear
			;;
			
			XTRA)
				echo "Installing some necessary extras."
				echo "You will only be notified of errors."
				apt-get -yqq install libgdk-pixbuf2.0-dev
				apt-get -yqq install libcairo-dev 		# dep:cairo
				apt-get -yqq install libx11-dev	  		# dep:x11
				apt-get -yqq install libx11-xcb-dev		# dep:x11-xcb
				apt-get -yqq install libxcb1-dev   		# dep:x11-xcb

				apt-get -yqq install libxcursor1		# dep:xcursor
				apt-get -yqq install libxcursor-dev		# dep:xcursor

				apt-get -yqq install libxcb-randr0-dev          # dep:xcb-randr
				apt-get -yqq install libxcb-xtest0-dev		# dep:xcb-xtest
				apt-get -yqq install libxcb-xinerama0-dev	# dep:xcb-xinerama
				apt-get -yqq install libxcb-shape0-dev		# dep:xcb-shape

				apt-get -yqq install libxcb-util0-dev		# dep:xcb-utils
										#xcb-util>=0.3.8

				apt-get -yqq install libxcb-keysyms1-dev	# dep:xcb-keysyms
										#xcb-keysyms>=0.3.4

				apt-get -yqq install libxcb-icccm4-dev		# dep:xcb-icccm
										#xcb-icccm>=0.3.8

				apt-get -yqq install libxcb-image0-dev		# dep:xcb-image
										#xcb-image>=0.3.0

				apt-get -yqq install libxcb-cairo0		# dep:cairo-xcb XXXXXXXXXXXXXXXXXXXXXXXXXXX

				apt-get -yqq install libstartup-notification0-dev # dep:libstartup-notification
										#libstartup-notification-1.0>=0.10

				apt-get -yqq install x11proto-core-dev		# dep:xproto
										#xproto>=7.0.15

				apt-get -yqq install libxdg-basedir-dev		# dep:libxdg-basedir
										#libxdg-basedir>=1.0.0
				apt-get -yqq install libimlib2-dev
				apt-get -yqq install liblua50-dev 		# wanted by cmake
				apt-get -yqq install liblua5.1-dev 		# wanted by cmake
				apt-get -yqq install liblua5.2-dev 		# wanted by cmake
				echo "It is done, sir."
				echo "Enter sleep time (0 cancels): "
				read XTRA_WAIT
				sleep "$XTRA_WAIT"							
				clear
			;;
			
			NVID)
				echo "Time to get  your graphics working again? Multihead monitor support?"
				echo "No problem, Sir."
				echo "I'll be installing nvidia-current-updates-dev, nvidia-settings-dev, in two seconds."
				sleep 2
				apt-get -y install nvidia-current-updates-dev
				apt-get -y install nvidia-settings-updates
				echo "It is done."
				clear
			;;
				###################################
				###################################
				##cd #home dir			 ##
				##mkdir .skakthing # ~/.skakthing##
				##cd .skakthing			 ##
				##apt-get -dyqq download awesome ##
				##cd ..				 ##
				##rm -R .skakthing		 ##
				###################################
				########DOWNLOAD BIN->DEPS#########
				###################################
			ASRC)
			    cd
			  
			# nested folder creation to test if the folder exists first -> git			  
			    if  [ -d ~/git ]; then
	   			cd ~/git
	   				if [ -d ~/git/awesome ]; then
	   					rm -R ~/git/awesome
	   					mkdir ~/git/awesome
	   					cd ~/git/awesome
	   				else
	   					mkdir ~/git/awesome
	   					cd ~/git/awesome
	   				fi
	   		    else
	   		    	    mkdir ~/git
	   		    	    mkdir ~/git/awesome
	   		    	    cd ~/git/awesome
	   		    fi
	   		    
				git clone git://git.naquadah.org/awesome.git
				cd ~/git/awesome/awesome
				git checkout master
			
			# nested folder creation to test if the folder exists first -> tmp	
			    if [ -d ~/tmp ]; then
				cd ~/tmp
					if [ -d ~/tmp/_build ]; then
						cd ~/tmp/_build
							if [ -d ~/tmp/_build/awesome-git ]; then
								rm -R awesome-git
								mkdir awesome-git
								cd awesome-git
							else
								mkdir awesome-git
								cd awesome-git
							fi
					else
						mkdir ~/tmp/_build
						cd ~/tmp/_build
					fi
			    else
				mkdir ~/tmp
				cd ~/tmp
			    fi
			
			# now make awesomewm
			    cmake ~/git/awesome/awesome
			    make
			    make install
			    # checkinstall
			
			echo "Will clear on your word (y/n): "
				read iffy
			if [ "$iffy" = "y" -o "$iffy" = "Y" ]; then
				clear
			elif [ "$iffy" = "n" -o "$iffy" = "N" ]; then
				echo "What would you like to do, sir?"
				echo "You can [W]ait for 60 seconds before clearing the screen and loading the main menu."
				echo "You can [C]lear the screen right now, and load the main menu."
				echo "You can E[x]it, if you would like."
				read iffyiffy
					if [ "$iffyiffy" = "W" -o "$iffyiffy" = "w" ]; then
						echo "Waiting 60s, then I will redirect you. Sir."
						sleep 60
						clear
					elif [ "$iffyiffy" = "C" -o "$iffyiffy" = "c" ]; then
						clear
					elif [ "$iffyiffy" = "X" -o "$iffyiffy" = "x" ]; then
						echo "Finally done? Great Job! Bravo!"
						sleep 2
						clear
						exit 0
					else
						echo "Are you sure you entered the right selection?"
						echo "I'm going to wait 60s, and then I'm going to exit on my own accord."
						echo "I won't clear the screen, you will keep your compile log."
						sleep 60
						exit 0
					fi
			else
				echo "Are you sure you entered the right selection?"
				echo "I'm going to wait 60s, and then I'm going to exit on my own accord."
				echo "I won't clear the screen, you will keep your compile log."
				sleep 60
				exit 0
			fi
			;;
			
			#apt-get -y install checkinstall # superior to make install
			#apt-get -y install awesome # tiling window manager
			#apt-get -y install awesome-extra # extras for the awesome tiling wm
			#apt-get -y install vim-gtk # vim plus the gtk extension for gui support

			*)
				echo "Mis-click, Mr. SKAK?"
			;;
		esac
done
fi
