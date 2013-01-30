//
//  ViewController.m
//  AOC1 Week 4
//
//  Created by Adam Vinsant on 1/29/13.
//  Copyright (c) 2013 Adam Vinsant. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    // Label for Username
    
    textLabel = [[UILabel alloc] initWithFrame:CGRectMake(10.0f,  30.0f, 100.0f, 20.0f)];
    textLabel.text = @"Username: ";
    [self.view addSubview:textLabel];
    
    //Text input for username
    
    userName = [[UITextField alloc] initWithFrame:CGRectMake(110.0f, 25.0f, 200.0f, 30.0f)];
    userName.borderStyle = UITextBorderStyleRoundedRect;
    [self.view addSubview:userName];
    
    // login button
    
    login = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    login.frame = CGRectMake(235.0f, 75.0f, 75.0f, 35.0f);
    login.tintColor = [UIColor greenColor];
    login.tag = 0;
    [login setTitle:@"Login" forState: UIControlStateNormal];
    [login addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:login];
    
    
    // This is the label that tells the user what to do
    
    instructions = [[UILabel alloc] initWithFrame:CGRectMake(5.0f, 130.0f, 310.0f, 80.0f)];
    instructions.text = @"Please Enter a Username";
    instructions.numberOfLines = 1;
    [instructions setTextAlignment:NSTextAlignmentCenter];
    [instructions setBackgroundColor:[UIColor grayColor]];
    [instructions setTextColor: [UIColor greenColor]];
    [self.view addSubview:instructions];
    
    // Date button
    
    dateButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    dateButton.frame = CGRectMake(10.0f, 230.0f, 100.0f, 35.0f);
    dateButton.tintColor = [UIColor greenColor];
    dateButton.tag = 1;
    [dateButton setTitle:@"Show Date" forState:UIControlStateNormal];
    [dateButton addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:dateButton];
    
    // info button for my name information
    
    nameButton = [UIButton buttonWithType: UIButtonTypeInfoDark];
    nameButton.frame = CGRectMake(10.0f, 280.0f, 20.0f, 20.0f);
    nameButton.tag = 2;
    [nameButton addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:nameButton];
    
    // name details when info button is pushed
    
    nameDetail = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 310.0f, 300.0f, 70.0f)];
    nameDetail.text = @"";
    nameDetail.numberOfLines = 2;
    [nameDetail setTextAlignment:NSTextAlignmentCenter];
    [nameDetail setTextColor: [UIColor greenColor]];
    [self.view addSubview:nameDetail];
    
}

// This is the onClick function that will make the buttons work. 

- (void)onClick: (UIButton*)button
{
    // Case 0 is the login button
    switch (button.tag){
        case 0:
        {
            // this will remove the keyboard after the user clicks the login button
            [userName resignFirstResponder];
            NSString *textInput = [userName text];
            
            // This replaces the instruction part with either a fail or a win
            if(textInput.length <1){
                instructions.text = @"Username cannot be empty.";
            }else if (textInput.length >1){
                NSString *userLogIn = [[NSString alloc] initWithFormat:@"%@ is now logged in!", textInput];
                instructions.text = userLogIn;
            }
        }
        
        break;
        
        // Case 1 is date and time alert
        case 1:
        {
            NSDate *date = [NSDate date];
            NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
            [dateFormat setDateStyle: NSDateFormatterLongStyle];
            [dateFormat setTimeStyle: NSDateFormatterFullStyle];
            NSString *dateString = [dateFormat stringFromDate:date];
            alertDate = [[UIAlertView alloc] initWithTitle: @"It is now..." message:dateString delegate:nil cancelButtonTitle:@"Got it!" otherButtonTitles:nil];
            [alertDate show];
        }
            
        break;
            
        // This will show my info when the little button is pressed
        case 2:
        {
            nameDetail.text = @"This application was created by the one and only, Adam Vinsant! Oh yeah, it works!!!";
            nameDetail.numberOfLines = 3;
            [nameDetail setBackgroundColor: [UIColor grayColor]];
            break;
        }
    }
    

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
