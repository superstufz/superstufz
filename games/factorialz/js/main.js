// Make calculating percentages easier
jQuery.extend({
    percentage: function(a, b) {
        return Math.round((a / b) * 100);
    }
});

$('#hisMis').hide();

var prob;
var curRoots;

if (getHistory() === []) {
    $('#hisMis').show();
}

function getHistory() {
    var hist = localStorage.getItem('history');
    var parsed = JSON.parse(hist);
    if (hist) {
        return JSON.parse(hist);
    } else {
        return [];
    }
}

function append() {
    var str = '';
    var probswers = getHistory();
    console.log(probswers[0]);
    for (var i = 0; i < probswers.length; i++) {
        var probswer = probswers[i];
        console.log(probswer);
        var theirAnStr;
        var corAnStr;
        var theirNums = probswer.theirNums;
        var corNums = probswer.corNums;

        if (probswer.theirNums.type === 'factor') {

            theirAnStr = '(' + theirNums.squareCo1 + 'x+' + theirNums.const1 + ')(' + theirNums.squareCo2 + 'x+' + theirNums.const2 + ')';
            corAnStr = '(' + corNums.squareCo1 + 'x+' + corNums.const1 + ')(' + corNums.squareCo2 + 'x+' + corNums.const2 + ')';

        } else {

            console.log(corNums);

            theirAnStr = theirNums.squareCo + 'x²+' + theirNums.mid + 'x+' + theirNums.const;
            corAnStr = corNums.squareCo + 'x²+' + corNums.mid + 'x+' + corNums.const;

            console.log(theirAnStr, corAnStr);

            theirAnStr = theirAnStr.replace(/\+-/g, '-');
            theirAnStr = theirAnStr.replace(/\+1x/g, '+x');
            theirAnStr = theirAnStr.replace(/-1x/g, '-x');
            theirAnStr = theirAnStr.replace(/\+0x/g, '');
            theirAnStr = theirAnStr.replace(/-0x/g, '');
            theirAnStr = theirAnStr.replace('1x²', 'x²');

            corAnStr = corAnStr.replace(/\+-/g, '-');
            corAnStr = corAnStr.replace(/\+1x/g, '+x');
            corAnStr = corAnStr.replace(/-1x/g, '-x');
            corAnStr = corAnStr.replace(/\+0x/g, '');
            corAnStr = corAnStr.replace(/-0x/g, '');
            corAnStr = corAnStr.replace('1x²', 'x²');

        }

        theirAnStr = theirAnStr.replace(/\(1x/g, '(x');
        theirAnStr = theirAnStr.replace(/\+0/g, '');
        theirAnStr = theirAnStr.replace(/-0/g, '');
        theirAnStr = theirAnStr.replace(/\(0x/g, '');
        theirAnStr = theirAnStr.replace(/\(0x/g, '');

        corAnStr = corAnStr.replace(/\(1x/g, '(x');
        corAnStr = corAnStr.replace(/\+0/g, '');
        corAnStr = corAnStr.replace(/-0/g, '');
        corAnStr = corAnStr.replace(/\(0x/g, '');
        corAnStr = corAnStr.replace(/\(0x/g, '');

        console.log(theirAnStr);

        if (probswer.correct) {
            str += '<tr class="success">'
        } else {
            str += '<tr class="danger">';
        }
        str += '<td>' + probswer.problem + '</td>';
        str += '<td>' + theirAnStr + '</td>';
        str += '<td>' + corAnStr + '</td>';
        str += '</tr>';
        $('#log').prepend(str);

    }
}

function updateHistory(prob, theirAns, corAns, theirNums, corNums, correct) {
    var probswer = {};
    probswer.problem = theirNums.prob;
    probswer.theirAns = theirAns;
    probswer.corAns = corAns;
    probswer.theirNums = theirNums;
    probswer.corNums = corNums;
    probswer.correct = correct;
    var log = getHistory();
    log.push(probswer);
    localStorage.setItem('history', JSON.stringify(log));

    var str;
    var theirAnStr;
    var corAnStr;
    theirAnStr = '(' + theirNums.squareCo1 + 'x+' + theirNums.const1 + ')(' + theirNums.squareCo2 + 'x+' + theirNums.const2 + ')';
    corAnStr = '(' + corNums.squareCo1 + 'x+' + corNums.const1 + ')(' + corNums.squareCo2 + 'x+' + corNums.const2 + ')';
    if (theirNums.type === 'factor') {
        theirAnStr = theirAnStr.replace(/\(1x/g, '(x');
        theirAnStr = theirAnStr.replace(/\+0/g, '');
        theirAnStr = theirAnStr.replace(/-0/g, '');
        theirAnStr = theirAnStr.replace(/\(0x/g, '');
        theirAnStr = theirAnStr.replace(/\(0x/g, '');
        console.log(corNums.const2);
        console.log(corAnStr);
        corAnStr = corAnStr.replace(/\(1x/g, '(x');
        corAnStr = corAnStr.replace(/\+0/g, '');
        corAnStr = corAnStr.replace(/-0/g, '');
        corAnStr = corAnStr.replace(/\(0x/g, '');
        corAnStr = corAnStr.replace(/\(0x/g, '');
        console.log(corAnStr);
    } else if (theirNums.type === 'expand') {
        theirAnStr = theirNums.squareCo + 'x²+' + theirNums.mid + 'x+' + theirNums.const;
        corAnStr = corNums.squareCo + 'x²+' + corNums.mid + 'x+' + corNums.const;
        console.log(corNums);

        console.log(theirAnStr, corAnStr);

        theirAnStr = theirAnStr.replace(/\+-/g, '-');
        theirAnStr = theirAnStr.replace(/\+1x/g, '+x');
        theirAnStr = theirAnStr.replace(/-1x/g, '-x');
        theirAnStr = theirAnStr.replace(/\+0x/g, '');
        theirAnStr = theirAnStr.replace(/-0x/g, '');
        theirAnStr = theirAnStr.replace('1x²', 'x²');

        corAnStr = corAnStr.replace(/\+-/g, '-');
        corAnStr = corAnStr.replace(/\+1x/g, '+x');
        corAnStr = corAnStr.replace(/-1x/g, '-x');
        corAnStr = corAnStr.replace(/\+0x/g, '');
        corAnStr = corAnStr.replace(/-0x/g, '');
        corAnStr = corAnStr.replace('1x²', 'x²');
    } else {
        console.error('Error');
    }
    theirAnStr = theirAnStr.replace(/\+-/g, '-');
    theirAnStr = theirAnStr.replace(/\+1x/g, '+x');
    theirAnStr = theirAnStr.replace(/-1x/g, '-x');
    theirAnStr = theirAnStr.replace(/\+0x/g, '');
    theirAnStr = theirAnStr.replace(/-0x/g, '');
    theirAnStr = theirAnStr.replace('1x²', 'x²');

    corAnStr = corAnStr.replace(/\+-/g, '-');
    corAnStr = corAnStr.replace(/\+1x/g, '+x');
    corAnStr = corAnStr.replace(/-1x/g, '-x');
    corAnStr = corAnStr.replace(/\+0x/g, '');
    corAnStr = corAnStr.replace(/-0x/g, '');
    corAnStr = corAnStr.replace('1x²', 'x²');
    console.log(corAnStr);
    str += '<tr>';
    str += '<td>' + probswer.problem + '</td>';
    str += '<td>' + theirAnStr + '</td>';
    str += '<td>' + corAnStr + '</td>';
    str += '</tr>';
    $('#log').prepend(str);
}

var history = getHistory();
var globProb;

function changeColor(progress, perc) {
    var color;

    if (perc === 0) {
        color = 'default';
    } else if (perc <= 25) {
        color = 'danger';
    } else if (perc <= 50) {
        color = 'warning';
    } else if (perc <= 75) {
        color = 'primary';
    } else if (perc < 100) {
        color = 'success';
    } else if (perc >= 100) {
        color = 'info';
    }

    $(progress).attr('class', 'progress-bar-striped progress-bar progress-bar-' + color);
    return color;
}

$('#msg').hide();

var msgs = ['Catching fire', 'Gettin\' hot', 'Flaming'];

function getMsg(streak){
    if (streak >= 4) return (streak + 1) + 'x ' + 'SUPER HOT';
    var msg = (streak + 1) + 'x ' + msgs[streak - 1];
    return msg;
}

$('#settings').hide();
$('#instr').hide();
$('#history').hide();

$('#openSidebar').click(function() {
    $('#sidebar').css({
        width: '250px'
    });
    event.stopPropagation();
    $(window).click(function() {
        $('#sidebar').css({
            width: '0px'
        });
    });

    $('#sidebar, #openSidebar').click(function(event) {
        event.stopPropagation();
    });

    $('#close').click(function() {
        $('#sidebar').css({
            width: '0px'
        });
    });
});

$('#showSettings').click(function() {
    $('#settings').show();
    $('#play').hide();
    $('#instr').hide();
    $('#history').hide();
    $('#sidebar').css({
        width: '0px'
    });
});

$('#showPlay').click(function() {
    $('#settings').hide();
    $('#play').show();
    $('#instr').hide();
    $('#history').hide();
    $('#sidebar').css({
        width: '0px'
    });
});

$('#showInstr').click(function() {
    $('#settings').hide();
    $('#play').hide();
    $('#history').hide();
    $('#instr').show();
    $('#sidebar').css({
        width: '0px'
    });
});

$('#showLog').click(function() {
    $('#settings').hide();
    $('#play').hide();
    $('#instr').hide();
    $('#history').show();
    $('#sidebar').css({
        width: '0px'
    });
})

$('#egoal, #fgoal, #tgoal').change(function () {
    var egoal = $('#egoal').val();
    var fgoal = $('#fgoal').val();
    var tgoal = $('#tgoal').val();
    egoal = parseInt(egoal);
    fgoal = parseInt(fgoal);
    tgoal = parseInt(tgoal);
    if (egoal <= 0 || fgoal <= 0 || tgoal <= 0) {
        return alert('Please enter valid a valid goal');
    }
    var scores = getPercentage();
    factorPerc = scores.factor;
    expandPerc = scores.expand;
    totalPerc = scores.total;

    updateScores();
});

var hasCompleted = {
    factor: {
        get: function() {
            var isComplete = localStorage.getItem('fcomp') || false;
            return isComplete;
        },
        set: function(isComplete) {
            localStorage.setItem('fcomp', isComplete);
        }
    },
    expand: {
        get: function() {
            var isComplete = localStorage.getItem('ecomp') || false;
            return isComplete;
        },
        set: function(isComplete) {
            localStorage.setItem('ecomp', isComplete);
        }
    },
    both: {
        get: function() {
            var isComplete = localStorage.getItem('bcomp') || false;
            return isComplete
        },
        set: function(isComplete) {
            localStorage.setItem('bcomp', isComplete);
        }
    }
};

var answer;
var perc = getPercentage();
var factorPerc = perc.factor;
var expandPerc = perc.expand;
var totalPerc = perc.total;
updateScores();

$('#resetProgress').click(function() {
    var sure = confirm('Are you sure?');
    if (sure === true) {
        localStorage.clear();
        var scores = getPercentage();
        factorPerc = scores.factor;
        expandPerc = scores.expand;
        totalPerc = scores.total;
        streak = 0;
        $('#msg').hide();
        $('#msg').text('');

        updateScores();
    }
});

$('#fgoal, #egoal, #tgoal').click(function () {
    var answer;
    var percl = getPercentage()
    factorPerc = percl.factor;
    expandPerc = percl.expand;
    totalPerc = percl.total;
    updateScores();
});

function updateScores() {

    if (factorPerc < 100) {

        $('#factorprogress').css({
            width: factorPerc + '%'
        });
        $('#factorprogress').attr('aria-valuenow', factorPerc);

    } else {
        $('#factorprogress').css({
            width: '100%',
        });
        $('#factorprogress').attr('aria-valuenow', 100);
    }
    changeColor('#factorprogress', factorPerc);
    $('#factorprogress').text(factorPerc + '%');

    if (expandPerc < 100) {

        $('#expandprogress').css({
            width: expandPerc + '%'
        });
        $('#expandprogress').attr('aria-valuenow', expandPerc);

    } else {
        $('#expandprogress').css({
            width: '100%',
        });
        $('#expandprogress').attr('aria-valuenow', 100);
    }
    changeColor('#expandprogress', expandPerc);
    $('#expandprogress').text(expandPerc + '%');

    if (totalPerc < 100) {

        $('#totalprogress').css({
            width: totalPerc + '%'
        });
        $('#totalprogress').attr('aria-valuenow', totalPerc);

    } else {
        $('#totalprogress').css({
            width: '100%',
        });
        $('#totalprogress').attr('aria-valuenow', 100);
    }
    changeColor('#totalprogress', totalPerc);
    $('#totalprogress').text(totalPerc + '%');

}

updateScores();

function getPercentage() {

    var factorGoal = parseInt($('#fgoal').val());
    var expandGoal = parseInt($('#egoal').val());
    var totalGoal = parseInt($('#tgoal').val());
    if (isNaN(factorGoal) || isNaN(expandGoal) || isNaN(totalGoal)) {
        alert('Please enter valid goal numbers (e.g. 20)');
    }
    var currentFactor = getScore('factor');
    var currentExpand = getScore('expand');
    var currentTotal = (currentFactor + currentExpand);
    var currentFactorPerc = $.percentage(currentFactor, factorGoal);
    var currentExpandPerc = $.percentage(currentExpand, expandGoal);
    var currentTotalPerc = $.percentage(currentTotal, totalGoal);
    return {
        factor: currentFactorPerc,
        expand: currentExpandPerc,
        total: currentTotalPerc
    };

}

function getScore(type) {
    if (type === 'factor') {
        return parseInt(localStorage.getItem('factorScore')) || 0;
    } else if (type === 'expand') {
        return parseInt(localStorage.getItem('expandScore')) || 0;
    }
}

function setScore(type, newScore) {
    if (type === 'factor') {
        localStorage.setItem('factorScore', newScore);
    } else if (type === 'expand') {
        localStorage.setItem('expandScore', newScore);
    }
}

function genCos(minNum, maxNum) {

    var sqrted;
    var sqrted2;

    if (minNum < 0) {
        sqrted = -Math.sqrt(0);
    } else {
        sqrted = Math.sqrt(0);
    }

    if (maxNum < 0) {
        sqrted2 = -Math.sqrt(-maxNum);
    } else {
        sqrted2 = Math.sqrt(maxNum);
    }

    var co1 = chance.integer({
        min: 1,
        max: sqrted2
    });
    var co2 = chance.integer({
        min: 1,
        max: sqrted2
    });

    return [co1, co2];

}

$('#const1').focus();

var op1plus = true;
var op2plus = true;
var op1plusexp = true;
var op2plusexp = true;

function swOp(num, isPlus) {
    if (num === 1) {
        op1plus = isPlus;
        if (op1plus) {
            $('#op1').text('+');
        } else {
            $('#op1').text('-');
        }
    } else {
        op2plus = isPlus;
        if (op2plus) {
            $('#op2').text('+');
        } else {
            $('#op2').text('-');
        }
    }
}

function swOpExp(num, isPlus) {
    if (num === 1) {
        op1plusexp = isPlus;
        if (op1plusexp) {
            $('#op1exp').text('+');
        } else {
            $('#op1exp').text('-');
        }
    } else {
        op2plusexp = isPlus;
        if (op2plusexp) {
            $('#op2exp').text('+');
        } else {
            $('#op2exp').text('-');
        }
    }
}

$('#const1').keydown(function(event) {
    if (event.keyCode === 17 || event.keyCode === 192) {
        swOp(1, !op1plus);
    }
});

$('#const2').keydown(function(event) {
    if (event.keyCode === 17 || event.keyCode === 192) {
        swOp(2, !op2plus);
    }
});

$('#mid').keydown(function(event) {
    if (event.keyCode === 17 || event.keyCode === 192) {
        swOpExp(1, !op1plusexp);
    }
});


$('#const').keydown(function(event) {
    if (event.keyCode === 17) {
        swOpExp(2, !op2plusexp);
    }
});

$('#answerForm-factor, #answerForm-expand').submit(function(event) {

    if (type === 'factor') {

        event.preventDefault();

        var squareCo1 = $('#squareco1').val() || 1;
        var squareCo2 = $('#squareco2').val() || 1;
        var const1 = $('#const1').val() || 0;
        var const2 = $('#const2').val() || 0;
        const1 = parseInt(const1);
        const2 = parseInt(const2);

        if (!op1plus) const1 = -const1;
        if (!op2plus) const2 = -const2;

        var middleTerm1 = squareCo1 * const2;
        var middleTerm2 = squareCo2 * const1;

        var theirAnswer = {
            squareCo: squareCo1 * squareCo2,
            middleTerm: middleTerm1 + middleTerm2,
            constTerm: const1 * const2
        };

        var theirNums = {
            const1: const1 || 0,
            const2: const2 || 0,
            squareCo1: squareCo1 || 1,
            squareCo2: squareCo2 || 0,
            type: 'factor',
            prob: prob
        };

        var corNums = {
            const1: curRoots[2],
            const2: curRoots[3],
            squareCo1: curRoots[0],
            squareCo2: curRoots[1]
        };

        isCorrect(theirAnswer, answer, theirNums, corNums);

        $('#const1, #const2, #squareco1, #squareco2').val('');

        $('#const1').focus();

        swOp(1, true);
        swOp(2, true);

    } else {

        event.preventDefault();

        var squareCo = $('#squareco').val() || 1;
        var middleTerm = $('#mid').val() || 0;
        var constTerm = $('#const').val() || 0;

        squareCo = parseInt(squareCo);
        middleTerm = parseInt(middleTerm);
        constTerm = parseInt(constTerm);

        if (!op1plusexp) {
            middleTerm = -middleTerm;
        }
        if (!op2plusexp) {
            constTerm = -constTerm;
        }

        var theirAnswer = {
            squareCo: squareCo,
            middleTerm: middleTerm,
            constTerm: constTerm
        };

        var theirNums = {
            mid: middleTerm || 0,
            const: constTerm || 0,
            squareCo: squareCo || 1,
            type: 'expand',
            prob: prob
        };

        var corNums = {
            const1: curRoots[2],
            const2: curRoots[3],
            squareCo1: curRoots[0],
            squareCo2: curRoots[1],
            type: type,
            prob: prob
        };


        swOpExp(1, true);
        swOpExp(2, true);

        isCorrect(theirAnswer, answer, theirNums, corNums);

        $('#squareco').val('1');
        $('#mid, #const').val('');

        var isCoAllowed = $('#allowCos').prop('checked');

        if (isCoAllowed) return $('#squareco').focus();

        $('#mid, #squareco, #const').val('');
        console.log('hello');

        $('#mid').focus();

    }

    if (isCoAllowed) {
        if (type === 'factor') {
            $('#squareco1').val('');
            $('#squareco2').val('');
        } else {
            $('#squareco').val('');
        }
    }

    if (type === 'factor') {
        $('#const1').val('');
        $('#const2').val('');
    } else {
        $('#mid').val('');
        $('#const').val('');
    }

});

var streak = 0;

function isCorrect(theirAnswer, correctAnswer, theirNums, corNums) {
    var correct;
    if (theirAnswer.squareCo === correctAnswer.squareCo && theirAnswer.constTerm === correctAnswer.constTerm && theirAnswer.middleTerm === correctAnswer.middleTerm) {
        $('#msg').show();
        $('#linebr').hide();
        $('#status').html('');
        $('#status').append('<div class="alert alert-success"> <strong>Correct!</strong>  Way to go!</div>');
        if (streak === 0) {
            setScore(type, getScore(type) + 5);
        } else {
            setScore(type, getScore(type) + streak*5);
            $('#msg').text(getMsg(streak));
        }
        correct = true;
        streak++;
        displayProblem();
    } else {
        $('#msg').hide();
        $('#msg').text('');
        $('#status').html('');
        $('#status').append('<div class="alert alert-danger"> <strong>Incorrect!</strong> Please try again.</div>');
        if (getScore(type) >= 5) {
            setScore(type, getScore(type) - 5);
        } else {
            setScore(type, 0);
        }
        streak = 0;
        correct = false;
    }

    var scores = getPercentage();
    factorPerc = scores.factor;
    expandPerc = scores.expand;
    totalPerc = scores.total;

    updateScores();
    updateHistory(prob, theirAnswer, correctAnswer, theirNums, corNums, correct);

    if (factorPerc >= 100 && hasCompleted.factor.get() === false) {
        alert('Congratulations!  You have mastered factoring!');
        hasCompleted.factor.set(true);
        displayProblem();
        var allowCos = $('#allowCos').prop('checked');
        if (allowCos) {
            $('#squareco').focus();
        } else {
            $('#mid').focus();
        }
    } else if (expandPerc >= 100 && hasCompleted.expand.get() === false) {
        alert('Congratulations!  You have mastered expanding!');
        hasCompleted.expand.set(true);
        type = 'factor';
        displayProblem();
        var allowCos = $('#allowCos').prop('checked');
        if (allowCos) {
            $('#squareco1').focus();
        } else {
            $('#const1').focus();
        }
    } else if (totalPerc === 100 && hasCompleted.total.get() === false) {
        alert('Congratulations!  You have mastered both!');
        hasCompleted.total.set(true);
    }

}

$('#op1').click(function() {
    swOp(1, !op1plus);
});

$('#op2').click(function() {
    swOp(2, !op2plus);
});

$('#op1exp').click(function() {
    swOpExp(1, !op1plusexp);
});

$('#op2exp').click(function() {
    swOpExp(2, !op2plusexp);
});

$('#nums').submit(function(event) {
    event.preventDefault();
    updateScores();
    displayProblem();
});

var type = 'factor';

$('#allowCos').click(function () {
    displayProblem();
});



function generateProblem() {
    var minNum = $('#minNum').val();
    var maxNum = $('#maxNum').val();

    minNum = parseInt(minNum);
    maxNum = parseInt(maxNum);

    var num1 = chance.integer({
        min: minNum,
        max: maxNum
    });
    var num2 = chance.integer({
        min: minNum,
        max: maxNum
    });


    var isCosAllowed = $('#allowCos').prop('checked');

    if (isCosAllowed) {

        var coefficients = genCos(minNum, maxNum);

    } else {
        var coefficients = [1, 1];
    }

    var squareCoefficient = coefficients[0] * coefficients[1];
    var firstMiddleTerm = coefficients[0] * num2;
    var secondMiddleTerm = coefficients[1] * num1;
    var middleTerm = firstMiddleTerm + secondMiddleTerm;
    var constant = num1 * num2;

    if (type === 'factor') {

        var problem = squareCoefficient + 'x²+' + middleTerm + 'x+' + constant;
        curRoots = [coefficients[0], coefficients[1], num1, num2];

    } else {

        var co1 = coefficients[0];
        var co2 = coefficients[1];
        var const1 = num1;
        var const2 = num2;
        var problem = '(' + co1 + 'x+' + const1 + ')(' + co2 + 'x+' + const2 + ')';
        var answer = {
            squareCo: squareCoefficient,
            middleTerm: middleTerm,
            constTerm: constant
        };
        curRoots = [answer.squareCo, answer.middleTerm, answer.constTerm];

        problem = problem.replace(/\(1x/g, '(x');
        problem = problem.replace(/\+0/g, '');
        problem = problem.replace(/-0/g, '');
        problem = problem.replace(/\(0x/g, '');
        problem = problem.replace(/\(0x/g, '');
    }

    problem = problem.replace(/\+-/g, '-');
    problem = problem.replace(/\+1x/g, '+x');
    problem = problem.replace(/-1x/g, '-x');
    problem = problem.replace(/\+0x/g, '');
    problem = problem.replace(/-0x/g, '');
    problem = problem.replace('1x²', 'x²');

    return {
        problem: problem,
        answer: {
            squareCo: squareCoefficient,
            middleTerm: middleTerm,
            constTerm: constant
        }
    };

}

function displayProblem() {
    var probswer = generateProblem();
    var problem = probswer.problem;
    var newAnswer = probswer.answer;

    prob = problem;

    globProb = problem;

    answer = newAnswer;


    var probElem = $('#problem');
    if (type === 'factor') {
        var isCoAllowed = $('#allowCos').prop('checked');

        if (!isCoAllowed) {
            $('#squareco1').hide();
            $('#squareco2').hide();
        } else {
            $('#squareco1').show();
            $('#squareco2').show();
        }
        probElem.text('Factor: ' + problem);
        $('#answerForm-factor').show();
        $('#answerForm-expand').hide();
    } else {
        var isCoAllowed = $('#allowCos').prop('checked');

        if (!isCoAllowed) {
            $('#squareco').hide();
        } else {
            $('#squareco').show();
        }
        probElem.text('Expand:' + problem);
        $('#answerForm-expand').show();
        $('#answerForm-factor').hide();
    }

    var isCoAllowed = $('#allowCos').prop('checked');

    if (!isCoAllowed) {
        $('#squareco1').hide();
        $('#squareco2').hide();
    } else {
        $('#squareco1').show();
        $('#squareco2').show();
    }

}

displayProblem();
append();