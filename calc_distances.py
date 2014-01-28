import pandas
import numpy

class DistanceCalc:
    def __init__(self, infilename):
        self.infilename = infilename

        self.readdata()
        self.finddistances()
        self.outputdistances()

    def readdata(self):
        self.data = pandas.read_csv(self.infilename)

    def finddistances(self):
        # This is the tricky bit.
        # For each row in the file, look at all the other rows in the file.
        # Calculate the multidimensional euclidean distance between the original row and
        # each other row in the file.

        goodfactors = ["Factor1",
            "Factor2",
            "Factor3",
            "Factor4",
            "Factor5",
            "Factor6"]

        def other_rows(row, df):
            otherrow = pandas.DataFrame(row.ix[goodfactors])
            original = df[goodfactors].T
            joined   = original.join(otherrow)
            joined.columns = ['a', 'b']
            diffs = joined.a - joined.b
            diffs = diffs ** 2
            return pandas.Series(
                    {'Distillery2' : row['Distillery'],
                     'distance'    : numpy.sqrt(sum(diffs))
                    }
                )


        def first_row(df):
            currentid = int(df.RowID)
            subset = self.data.ix[self.data.RowID != currentid]
            distances = subset.apply(other_rows, axis = 1, args = (df, ))
            distances['Distillery1'] = list(df['Distillery'])[0]
            return distances


        self.distances = first_row(self.data.ix[0:0])
        for i in range(1, len(self.data.index)):
            print self.data.ix[i:i].Distillery
            d = first_row(self.data.ix[i:i])
            print d.head()
            self.distances = self.distances.append(d)


    def outputdistances(self):
        self.distances.to_csv("distillery_distances.csv", index = False)

if __name__ == "__main__":
    dc = DistanceCalc("whiskies_w_factors.csv")

