require(ggplot2)
require(reshape)
require(plyr)
require(xtable)

data <- read.csv("whiskies.txt", stringsAsFactors = FALSE)
data$Postcode <- sub("\t", "", data$Postcode)

# ---- 
# correlation matrix
plot.data <- melt(cor(data[3:14]))
p <- ggplot(plot.data, aes(x=X1, y=X2, fill=value)) +
  geom_tile() + 
  scale_fill_gradient2(limits = c(-1,1), low="tomato", high="steelblue") + 
  theme_bw() + 
  xlab("") + 
  ylab("") + 
  theme(axis.text.x = element_text(angle=45, hjust = 1),
        axis.text.y = element_text(angle=45, hjust = 1))

ggsave(plot=p, width = 9, height=8, filename="plots/correlations.svg")
# looks like there isn't too much colinearity there, with the exception of medicinal and smoky

# ----
# look at the distributions of each of the measures
plot.data <- melt(data[2:14])
plot.data$value <- factor(plot.data$value)
p <- ggplot(plot.data, aes(x=value, group=1)) + 
  geom_freqpoly(binwidth=1, colour = "steelblue", size=1) + 
  facet_wrap( ~ variable, ncol=2) +
  xlab("Rating") + 
  ylab("Number of ratings")

ggsave(plot=p, filename="plots/distributions.svg", width = 9, height = 6)

# some interesting things there
# - tobacco only has 0s and 1s
# - there are no 4 ratings for spicy, fruity and malty
# - proportionally lots of 4 ratings for body
# - most of the distributions have a peak at 2, the exceptions are smoky/medicinal and winey which have lower peaks.

# ----
# factor analysis
# 6 factors seems to work quite well
fa <- factanal(data[3:14], 6, scores="regression")
# write them out to files to process in other places
outdata <- cbind(data, fa$scores)
write.table(outdata, 
            file="whiskies_w_factors.csv",
            row.names = FALSE,
            sep=",")

write.table(fa$loadings,
            file="factor_breakdown.csv",
            sep=",")
loadings <- read.csv("factor_breakdown.csv")

write(print(xtable(loadings), type="html"), file="factor_breakdown.html")
