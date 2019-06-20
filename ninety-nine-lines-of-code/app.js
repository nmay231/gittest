let friends = ['Bob', 'Barbara', 'Synthia', 'Joe', 'Will']

let lines = n => {
    return n == 1 ? 'line' : 'lines'
}

for (let friend of friends) {
    console.log(friend.toUpperCase() + ':')
    for (let j = 5; j > 0; j--) {

        // Probably inefficient due to repeated calls of lines(), but whatever...
        console.log(
            j + ' ' + lines(j) + ' of code in the file, ' +
            j + ' ' + lines(j) + ' of code; ' +
            friend + ' strikes one out, clears it all out, ' +
            (j - 1 || 'no more') + ' ' + lines(j - 1) + ' of code in the file!'
        )
    }
}