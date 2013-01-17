//
//  ViewController.m
//  AOC1 Week 2
//
//  Created by Adam Vinsant on 1/16/13.
//  Copyright (c) 2013 Adam Vinsant. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    //background color
    self.view.backgroundColor = [UIColor whiteColor];
    
    //title text
    title = [[UILabel alloc] initWithFrame: CGRectMake(50.0f, 10.0f, 200.0f, 20.0f)];
    
    title.text = @"Tom Sawyer";
    title.textAlignment = NSTextAlignmentCenter;
    title.backgroundColor = [UIColor blueColor];
    title.textColor = [UIColor lightGrayColor];
    
    [self.view addSubview:title];
    
    //author label
    authorLabel = [[UILabel alloc] initWithFrame: CGRectMake(50.0, 35.0f, 100.0f, 20.0f)];
    authorLabel.text = @"Author: ";
    authorLabel.textAlignment = NSTextAlignmentRight;
    authorLabel.backgroundColor = [UIColor grayColor];
    authorLabel.textColor = [UIColor magentaColor];

    [self.view addSubview:authorLabel];
    
    //Author
    author = [[UILabel alloc] initWithFrame:CGRectMake(150.0f, 35.0f, 100.0f, 20.0f)];
    author.text = @"Mark Twain";
    author.textAlignment = NSTextAlignmentLeft;
    author.backgroundColor = [UIColor blackColor];
    author.textColor = [UIColor whiteColor];
    
    [self.view addSubview:author];
    
    //Published Label
    publishedLabel = [[UILabel alloc] initWithFrame:CGRectMake(50.0f, 60.0f, 100.0f, 20.0f)];
    publishedLabel.text = @"Published: ";
    publishedLabel.textAlignment = NSTextAlignmentRight;
    publishedLabel.backgroundColor = [UIColor brownColor];
    publishedLabel.textColor = [UIColor orangeColor];
    
    [self.view addSubview:publishedLabel];
    
    //Published date
    published = [[UILabel alloc] initWithFrame:CGRectMake(150.0f, 60.0f, 100.0f, 20.0f)];
    published.text = @"June 1876";
    published.textAlignment = NSTextAlignmentLeft;
    published.backgroundColor = [UIColor grayColor];
    published.textColor = [UIColor redColor];
    
    [self.view addSubview:published];
    
    //Summary Label
    summaryLabel = [[UILabel alloc] initWithFrame:CGRectMake (100.0f, 90.0f, 100.0f, 20.0f)];
    summaryLabel.text = @"Summary: ";
    summaryLabel.textAlignment = NSTextAlignmentLeft;
    summaryLabel.backgroundColor = [UIColor cyanColor];
    summaryLabel.textColor = [UIColor magentaColor];

    [self.view addSubview:summaryLabel];
    
    //Book Summary
    summary = [[UILabel alloc] initWithFrame:CGRectMake(50.0f, 120.0f, 200.0f, 250.0f)];
    summary.text = @"This book is about a boy named Tom Sawyer and his best friend Huckleberry Finn. These two love to go on adventures and cause trouble. They witness a murder and then fake their own death. Then they end up saving the day and became the town heros.";
    summary.textAlignment = NSTextAlignmentLeft;
    summary.backgroundColor = [UIColor greenColor];
    summary.textColor = [UIColor yellowColor];
    summary.NumberOfLines = 15;
    
    [self.view addSubview:summary];
    
    
    //Array
    NSArray *bookCharacters = [[NSArray alloc] initWithObjects:@"Tom",@"Huck",@"Injun Joe", @"Aunt Polly",@"Dr. Robinson",nil];
    
    //character Label
    charLabel = [[UILabel alloc] initWithFrame:CGRectMake(100.0f, 380.0f, 100.0f, 20.0f)];
    
    charLabel.text = @"List of Items:";
    charLabel.textAlignment = NSTextAlignmentLeft;
    charLabel.backgroundColor = [UIColor purpleColor];
    charLabel.textColor = [UIColor redColor];
    
    [self.view addSubview:charLabel];
    
    //Characters
    
    characters = [[UILabel alloc] initWithFrame:CGRectMake(50.0f, 405.0f, 200.0f, 70.0f)];
    
    NSMutableString *mutableString = [NSMutableString string];
    
    for (int i=0; i<5; i++){
        [mutableString appendString:[bookCharacters objectAtIndex:i]];
        if (i<4){
            [mutableString appendString:@", "];
        } else {
            [mutableString appendString:@"."];
        } if (i == 3){
            [mutableString appendString:@"and "];
        }
    }
    
    {
        characters.text = mutableString;
        characters.backgroundColor = [UIColor darkGrayColor];
        characters.textColor = [UIColor cyanColor];
        characters.numberOfLines = 5;
        characters.textAlignment = NSTextAlignmentCenter;
    }
    
    [self.view addSubview:characters];

    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
