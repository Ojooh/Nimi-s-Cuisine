import {
    isEmpty, validateName, validateUsername, validateAge, validateNamey, validateEmail, validateTel,
    validFBLink, validIGLink, validtwitterLink, validFutureDate, validGreaterDate, validYTLink, isImage,
    validatePass

} from './helper.js'

const validateLogin = (userDetails) => {
    if (isEmpty(userDetails.username) || ((validateUsername(userDetails.username) == false) && (validateEmail(userDetails.username) == false))) {
        return [null, false, { message: 'Username Input is not Valid' }];
    }
    else if (isEmpty(userDetails.pass) || validatePass(userDetails.pass) == false) {
        return [null, false, { message: 'Password Input is not Valid' }];
    }
    else {
        return [null, true, { message: 'User Profile is Valid' }];
    }

}

// let r;

const validateProfile = (userDetails) => {
    if (isEmpty(userDetails.fname) || !validateName(userDetails.fname)) {
        return [null, false, { message: 'First Name Input is not Valid' }];
    }
    else if (isEmpty(userDetails.lname) || !validateName(userDetails.lname)) {
        return [null, false, { message: 'Last Name Input is not Valid' }];
    }
    else if (isEmpty(userDetails.username) || !validateUsername(userDetails.username)) {
        return [null, false, { message: 'Username Input is not Valid' }];
    }
    else if (isEmpty(userDetails.gender)) {
        return [null, false, { message: 'Gender Input is not Valid' }];
    }
    else if (isEmpty(userDetails.dob) || validateAge(userDetails.dob)) {
        return [null, false, { message: 'Date of Birth Input is not Valid' }];
    } else {
        return [null, true, { message: 'User Profile is Valid' }];
    }

}

const validateSocial = (userDetails) => {
    if (isEmpty(userDetails.email) || !validateEmail(userDetails.email)) {
        return [null, false, { message: 'Email Input is not Valid' }];
    }
    else if ((!isEmpty(userDetails.phone) && parseInt(userDetails.phone) != 0) && !validateTel(userDetails.phone)) {
        return [null, false, { message: 'Telephone Input is not Valid' }];
    }
    else if (!isEmpty(userDetails.FB) && !validFBLink(userDetails.FB)) {
        return [null, false, { message: 'Facebook Profile Link Input is not Valid' }];
    }
    else if (!isEmpty(userDetails.IG) && !validIGLink(userDetails.IG)) {
        return [null, false, { message: 'Instagram, Profile Link Input is not Valid' }];
    }
    else if (!isEmpty(userDetails.twitter) && !validtwitterLink(userDetails.twitter)) {
        return [null, false, { message: 'Twitter Hanlde Input is not Valid' }];
    }

    else {
        return [null, true, { message: 'User Social Profile is Valid' }];
    }

}

const validateEvent = (info, index) => {
    if ((index == 0) && (isEmpty(info[index]) || !validateNamey(info[index]))) {
        return [null, false, { message: 'Event Title Input is not Valid' }];
    }
    else if ((index == 2) && (isEmpty(info[index][0]) || !validFutureDate(info[index][0]))) {
        // r = info
        return [null, false, { message: 'Event Start Date Input is not Valid, Should be a Future Date' }];
    }
    else if ((index == 2) && (isEmpty(info[index][1]) || !validFutureDate(info[index][1]) || !validGreaterDate(info[index][1], info[index][0]))) {
        return [null, false, { message: 'Event End Date Input is not Valid, should be a future Date and after the start Date' }];
    }
    else if ((index == 3) && (isEmpty(info[index]) || !validYTLink(info[index]))) {
        return [null, false, { message: 'Event Link is Input is not a Valid Youtube Link' }];
    }

    else if ((index == 6) && (isEmpty(info[index]) || !isImage(info[index]))) {
        console.log(info[index])
        return [null, false, { message: 'Event Image Input is not a Image' }];
    }
    else {
        return [null, true, { message: 'INFO is Valid' }];
    }
}

const validateChangePass = (inpts) => {

    if (isEmpty(inpts[0]) || !validatePass(inpts[0])) {
        return [null, false, { message: 'Old Password Input not valid' }];
    }
    else if (isEmpty(inpts[1]) || !validatePass(inpts[1])) {
        return [null, false, { message: 'New Password Input not valid' }];
    }
    else if (isEmpty(inpts[2]) || !validatePass(inpts[2])) {
        return [null, false, { message: 'Confirm Password Input not valid' }];
    }
    else if (inpts[1] != inpts[2]) {
        return [null, false, { message: 'Confirm Password does not match New Password' }];
    }
    else {
        return [null, true, { message: 'INFO is Valid' }];
    }

}

const validateProfilePic = (pp) => {

    if (isEmpty(pp) || !isImage(pp)) {
        return [null, false, { message: 'Profile Pic Input is not a Image' }];
    }
    else {
        return [null, true, { message: 'INFO is Valid' }];
    }
}


export { validateLogin }