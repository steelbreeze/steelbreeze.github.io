#!/usr/bin/env perl

my $inputfile = $ARGV[0];
my $outputfile = $ARGV[1];

open(IN,"<$inputfile") or die ("$! $inputfile");
open(OUT,">$outputfile") or die ("$! $outputfile");

while (my $line = <IN> ){
        if ( $line =~/(<!--#include virtual="([\/a-zA-Z0-9_\-\.]+)"-->)/ ){
                my $all = $1;
                my $file = $2;

                my $sep = "\\";
                if ( $^O =~/linux|bsd/ ){
                        $sep = "/";
                }
                my @path = split("/",$file);
                $file = join($sep,@path);

                open(GET,"<$file") or die "$! $file";
                my $content = "";
                while( my $cline = <GET> ){
                        $content .= $cline;
                }
                close(GET);
                $line =~ s/$all/$content/;
        }
        print OUT $line;
}

close(OUT);
close(IN);