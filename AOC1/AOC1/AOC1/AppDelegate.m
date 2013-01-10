//
//  AppDelegate.m
//  AOC1
//
//  Created by Adam Vinsant on 1/9/13.
//  Copyright (c) 2013 Adam Vinsant. All rights reserved.
//

#import "AppDelegate.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Week 1 Objectives
    // 1. Create a new Empty Application Project...DONE!!! LOL!!!
    
    //2.  Create a variable using the float data type. Cast the float to an int and using NSLog, output both the initial float value as well as the int value.
    
    //3. Perform an AND, OR comparison. Use float, int and BOOL types. BOOL values should be YES or NO and written in all caps.
    
    //4. Use an if, else if and else check using any of the data types of your choice.
    
    //5. Perform a single for loop printing out values to the console
    
    //6. Perform a nested loop printing out values to the console
    
    //7. Perform a while loop that increments an int variable and outputs to the console.
    
        
    //Objective 2 + allot of other variables to tell my story.
    float fullDayAtWork = 9.5;
    int fullDayHours = (int)fullDayAtWork;
    int fullLunch = 1;
    float partDayAtWork = 7.5;
    int partDay = (int)partDayAtWork;
    float partLunch = 0.5;
    int fullPaidHours = fullDayHours - fullLunch;
    float partDayHours = partDay - (float)partLunch;
    int payRate = 14;
    
    //Based on 3 full days and 2 part days
    float hoursWorkedThisWeek = fullPaidHours *3 + (float)partDayHours * 2;
    float grossWeeklyPay = payRate * hoursWorkedThisWeek;
    
    // And the story begins
    NSLog(@"Well hello my friends and let me tell you a little coded story...or something like that :P");
    NSLog(@"I work as a Specialist at the Apple Store");
    NSLog(@"Basically on a full day I am at the mall for about %.1f hours", fullDayAtWork);
    NSLog(@"On those days I am scheduled for %d hours", fullDayHours);
    NSLog(@"On full days I have a %d hour break.", fullLunch);
    NSLog(@"So I will be paid for a total of %d hours for that day.", fullPaidHours);
    NSLog(@"If I am working a part day I am working no more than %d hours.", partDay);
    NSLog(@"On part days I only get a %.1f hour break.", partLunch);
    NSLog(@"So you guessed it... On those days I get paid for %.1f hours.", partDayHours);
    NSLog(@"I get paid $%d per hour.", payRate);
    NSLog(@"So if I work 3 full days and 2 part days in a week, I will have been clocked in for %.0f hours for that week.", hoursWorkedThisWeek);
    NSLog(@"So before taxes, I will get paid %.2f for the week.", grossWeeklyPay);
    NSLog(@"Not bad...Especially when all you do is mess with Apple devices all day long.");
    NSLog(@"So as well all are, slaves to the system, I have to work 2 jobs. I am also a server at California Pizza Kitchen.");
    NSLog(@"And sometimes I have to work at both places in the same day...This leads us to Objectives 3 and 4...");
    
    NSLog(@"So if I made good money and had good customers...");
   //variables for objectives 3 and 4
    BOOL goodTips = YES;
    BOOL goodCustomers = YES;
    
    
    float goodMoney = 75.5;
    int badMoney = 40;
    
    //Objectives 3 and 4
    if((goodTips) && (goodCustomers)){
        NSLog(@"Well that was a good day at CPK!!! Now on to Apple to make some more money!");
    }else if ((goodMoney <= 75)|| (badMoney <= 40 )){
        NSLog(@"Well that could have been better but wasn't aweful, now on to work at Apple!");
    }else {
        NSLog(@"Well that was a crappy day at CPK, at least I work at Apple to make up for the loss!");
    }
    
    NSLog(@"Ok, so i worked today at CPK, so it is a part day at Apple. That means I am working no more than %d hours.", partDay);
    NSLog(@"Lets count them down, shall we?!? BTW this goes into Objectives 5 and 6...");
    
    //Objectives 5 and 6
    //Single Loop
    for (int hoursLeft = 3; hoursLeft > 0; hoursLeft--)
    {
        NSLog(@"I have %d hours left till I can go to lunch.", hoursLeft);
    }
    
    NSLog(@"So for lunch I think I will have pizza... how many pieces can I eat?");
    
    //Nested Loop with conditional and break... Tried it the other way and kept getting this long repetative loop, so I changed it and did the loop with nested conditional. 
    
    int pizzaSlicesICanEat = 4;
    
    for (int slices = 8; slices != 0; slices --)
    {
        NSLog(@"Pizza time! I have %d slices left.", slices);
        
        if(pizzaSlicesICanEat >= slices)
        {
            NSLog(@"That was some good pizza, but I can only eat %d slices. I will see if anyone wants a piece...This brings me to Objective 7...", pizzaSlicesICanEat);
            break;
        }
    }
    
        
    //Objective 7
    int slicesLeft = 4;
    
    while (slicesLeft>0)
    {
        NSLog(@"Would anyone want some pizza, I have %d slices left", slicesLeft);
        
        slicesLeft --;
        
        NSLog(@"That's it, there are %d slices left", slicesLeft);
    }
    
    NSLog(@"So that's lunch...Time to go back to work...");
    
    for (float timeTillLeave =3.5; timeTillLeave >0; timeTillLeave --)
    {
        NSLog(@"So now I have only %.1f hours till I get to go home!", timeTillLeave);
    }
    
    NSLog(@"YAY!!! FREEDOM!!! Time to go home and see the family.");
    NSLog(@"So that's the end folks... See you next time!");
    
    
    
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
     return YES;
    
    
}



- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
