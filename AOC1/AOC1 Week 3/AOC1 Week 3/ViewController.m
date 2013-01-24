//
//  ViewController.m
//  AOC1 Week 3
//
//  Created by Adam Vinsant on 1/23/13.
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
    
    //int's for addition function
    int num1= 13;
    int num2= 8;
    
    // int's for boolean function
    int numA= 30;
    int numB= 30;
    [self compare:numA numB:numB];
   
    //NSInteger
    NSInteger addProblem = [self add: num1 num2:num2];
    
    // Turning NSInteger into a NSNumber
    displaySum = [[NSNumber alloc] initWithInt: addProblem];
    
    // Turning NSNumber into an NSString
    sumString = [self numToString:displaySum];
    [self displayAlertWithString:sumString];
    
    //Mutable string with Append
    mutableString = [self append:@"Objective C is okay, " string2:@"but I like Javascript better, makes more sense to me."];
    [self displayAlertWithString:mutableString];
    
}

// Alert display function
- (NSString*)displayAlertWithString:(NSString*)string
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Alert" message: string delegate:nil cancelButtonTitle:@"Awesome, it works!"otherButtonTitles:nil];
    
    if (alert != nil)
    {
        [alert show];
    }
    
    return @"";
}



//Addition function
- (int)add:(NSInteger)num1 num2:(NSInteger)num2
{
    int sum = num1 + num2;
    
    return sum;
}

//Addtion Problem Results function
- (NSString*) numToString:(NSNumber*)sumResult
{
    NSInteger result = [sumResult integerValue];
    
    resultsString = [[NSString alloc] initWithFormat:@"The answer to the problem is %d", result];
    
    return resultsString;
}


//Compare Function

- (BOOL)compare: (NSInteger)numA numB:(NSInteger)numB
{
    if (numA == numB)
    {
        NSString *compareTrue = [[NSString alloc] initWithFormat:@"%d is equal to %d.", numA,numB];
        [self displayAlertWithString:compareTrue];
        
        return YES;
    
    }else{
        NSString *compareFalse= [[NSString alloc] initWithFormat:@"%d is NOT equal to %d.", numA, numB];
        [self displayAlertWithString:compareFalse];
        
        return NO;
        
    }
}

//Combining strings together

- (NSString*)append:(NSString*)string1 string2:(NSString*)string2
{
    NSMutableString *appendString = [[NSMutableString alloc] initWithString:string1];
    
    if (appendString != nil)
    {
        [appendString appendString: string2];
    };
    
    return appendString;
}




- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
