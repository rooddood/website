def stringMan(string):
    #grab the first letter
    first = string[0]

    retstring = first + ''

    #loop over the string, checking every letter
    notfirst = 0
    for ele in string[1:]:
        #everytime we find a b, swap with %
        # if notfirst == 0:
        #     notfirst = 1
        #     continue
        # else:
        print(ele)
        if ele == first:
            retstring += '%'
            print(ele)
        else:
            retstring += ele

    return retstring


string = 'babble'
print(stringMan(string))
