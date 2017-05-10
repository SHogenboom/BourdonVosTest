##### SET WD TO SOURCE FILE LOCATION #####

## CREATE DATA SET WITH DATAPOINTS TO BE ENTERED IN GRAPH ##
dat <- matrix(ncol = 2, c(1,1, 1,2, 1,3, 2,1, 2,2, 2,3, 3,1, 3,2, 3,3), byrow = TRUE) #creates a 3x3 grid

# oldpar <- par #store old values for par, so par settings can be reset
par(pty="s") #to create a square plotting region

###### RANDOMIZE COLORS AKA PATTERN OF DOTS PER GRAPH #####
# TO DO write a loop to change colors with a maximum of 3/4/5 black dots per figure
rndcolors5 <- c("black", "white","white", "black", "black", "black", "black", "white", "white" ) #for testing purposes
rndcolors4 <- c("black", "black", "white", "black", "black", "white", "white", "white", "white")
##### PLOT THE DATAPOINTS #####

plot(dat[,2]~dat[,1], type="p", xlab = "", ylab = "", xlim=c(0,4), ylim=c(0,4), cex = 5, frame.plot=FALSE, asp = 1, lwd = 2,
     axes = FALSE, pch = 21, bg = rndcolors5, col = "white")

plot(dat[,2]~dat[,1], type="p", xlab = "", ylab = "", xlim=c(0,4), ylim=c(0,4), cex = 5, frame.plot=FALSE, asp = 1, lwd = 2,
     axes = FALSE, pch = 21, bg = rndcolors4, col = "white")

#type = p and pch 21 creates circkles that can be filled. bg determines the colors of the circkels. A vector of colors assigns a different color per datapoint
# cex =2 enlarges the datapoints. asp ratio = 1 to ensure that vertical and horizontal distances between datapoints are the same

###### CREATE FUNCTION TO SAVE CREATED PLOTS #####
#
#
#
################################################



