describe('AI-powered test with Groq', () => {
  
  // === BASIC YOUTUBE TESTS ===
  
  it('Analyzes YouTube homepage with AI', () => {
    cy.visit('https://www.youtube.com/');
    
    // Wait for page to load
    cy.wait(2000);
    
    // Get the page title and URL
    cy.title().then((title) => {
      cy.url().then((url) => {
        cy.askGroq(
          `I'm on a webpage with title "${title}" at URL ${url}. 
          What website am I on and what is its main purpose? 
          Please provide a brief answer in 2-3 sentences.`
        ).then((aiResponse) => {
          cy.log("🤖 Groq AI Analysis:", aiResponse);
          
          // Verify AI recognizes YouTube
          expect(aiResponse.toLowerCase()).to.include('youtube');
        });
      });
    });
  });

  it('Searches YouTube and analyzes results with AI', () => {
    cy.visit('https://www.youtube.com/');
    
    // Wait for page to load
    cy.wait(2000);
    
    // Search for something (YouTube search box)
    cy.get('input[name="search_query"]').type('cypress testing tutorial{enter}');
    
    // Wait for results to load
    cy.wait(3000);
    
    // Get search results count
    cy.get('ytd-video-renderer', { timeout: 10000 }).should('have.length.greaterThan', 0);
    
    cy.url().then((url) => {
      cy.askGroq(
        `I searched for "cypress testing tutorial" on YouTube and the URL is now ${url}. 
        Based on this URL, am I viewing search results? Answer YES or NO with a brief explanation.`
      ).then((aiResponse) => {
        cy.log("🔍 Search Analysis:", aiResponse);
        
        // Verify AI recognizes search results page
        expect(aiResponse.toUpperCase()).to.include('YES');
      });
    });
  });

  it('Uses AI to verify YouTube video player', () => {
    // Visit a specific YouTube video (Cypress.io intro video)
    cy.visit('https://www.youtube.com/watch?v=BQqzfHQkREo');
    
    // Wait for video player to load
    cy.wait(2000);
    
    // Check if video player exists
    cy.get('video').should('exist');
    
    cy.url().then((url) => {
      cy.title().then((title) => {
        cy.askGroq(
          `I'm on a page with URL ${url} and title "${title}". 
          Am I watching a YouTube video? What can you tell about this video from the URL and title?
          Please answer in 2-3 sentences.`
        ).then((aiResponse) => {
          cy.log("🎥 Video Analysis:", aiResponse);
          
          // Verify AI recognizes video page
          expect(aiResponse.toLowerCase()).to.include('video');
        });
      });
    });
  });

  // === ADVANCED AI ANALYSIS TESTS ===

  it('AI analyzes page structure and navigation elements', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(3000);
    
    // Simply check if we have video content
    cy.get('body').then(() => {
      // Count visible video thumbnails
      cy.get('img[src*="i.ytimg.com"]', { timeout: 10000 }).then(($thumbnails) => {
        const thumbnailCount = $thumbnails.length;
        
        cy.askGroq(
          `I'm on YouTube homepage and I can see ${thumbnailCount} video thumbnails. 
          Is this a typical number of videos to show on a video platform homepage? 
          What are the key elements users expect to see on YouTube's homepage?
          Answer in 2-3 sentences.`
        ).then((aiResponse) => {
          cy.log("🗂️ Navigation Analysis:", aiResponse);
          expect(aiResponse.toLowerCase()).to.satisfy((text) => 
            text.includes('home') || text.includes('typical') || text.includes('video') || 
            text.includes('youtube') || text.includes('thumbnail')
          );
        });
      });
    });
  });

  it('AI detects and analyzes trending content', () => {
    cy.visit('https://www.youtube.com/feed/trending');
    cy.wait(3000);
    
    // Get the first few video titles
    cy.get('h3.ytd-rich-item-renderer', { timeout: 10000 })
      .first()
      .invoke('text')
      .then((firstVideoTitle) => {
        cy.askGroq(
          `I'm on YouTube's trending page. The first trending video is titled: "${firstVideoTitle}". 
          Based on this title, what type of content seems to be trending? 
          Is this typical for trending content on video platforms?
          Answer in 2-3 sentences.`
        ).then((aiResponse) => {
          cy.log("📈 Trending Analysis:", aiResponse);
          expect(aiResponse).to.not.be.empty;
        });
      });
  });

  it('AI validates search filters and sorting', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Search for something
    cy.get('input[name="search_query"]').type('javascript tutorial{enter}');
    cy.wait(3000);
    
    // Click on filters button
    cy.get('button[aria-label="Search filters"]').first().click();
    cy.wait(1000);
    
    // Check if filter menu is visible
    cy.get('ytd-search-filter-group-renderer').should('be.visible');
    
    cy.askGroq(
      `I searched for "javascript tutorial" on YouTube and opened the filters menu. 
      What types of filters would be most useful for educational content like tutorials? 
      Name 3-4 important filters and explain why they matter for learners.`
    ).then((aiResponse) => {
      cy.log("🎛️ Filter Recommendations:", aiResponse);
      
      // AI should mention relevant filters
      expect(aiResponse.toLowerCase()).to.satisfy((text) => 
        text.includes('duration') || text.includes('upload') || text.includes('quality') || text.includes('subtitle')
      );
    });
  });

  it('AI analyzes video recommendations relevance', () => {
    // Visit a tech video
    cy.visit('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    cy.wait(3000);
    
    // Get recommended video titles (sidebar)
    cy.get('ytd-compact-video-renderer h3', { timeout: 10000 })
      .first()
      .invoke('text')
      .then((recommendedTitle) => {
        cy.title().then((currentTitle) => {
          cy.askGroq(
            `I'm watching a video titled "${currentTitle}" and YouTube is recommending a video titled "${recommendedTitle}". 
            Are these videos related? How would you rate the relevance of this recommendation (HIGH/MEDIUM/LOW)? 
            Explain your reasoning in 2 sentences.`
          ).then((aiResponse) => {
            cy.log("🎯 Recommendation Analysis:", aiResponse);
            
            // AI should provide a relevance rating
            expect(aiResponse.toUpperCase()).to.satisfy((text) => 
              text.includes('HIGH') || text.includes('MEDIUM') || text.includes('LOW')
            );
          });
        });
      });
  });

  it('AI detects page loading issues or errors', () => {
    cy.visit('https://www.youtube.com/404notfound');
    cy.wait(2000);
    
    // Get page content
    cy.get('body').invoke('text').then((bodyText) => {
      cy.askGroq(
        `I tried to visit a YouTube URL and the page shows: "${bodyText.substring(0, 200)}...". 
        Is this an error page? What type of error is this? 
        What should a user do in this situation? Answer in 2-3 sentences.`
      ).then((aiResponse) => {
        cy.log("❌ Error Detection:", aiResponse);
        
        // AI should recognize error
        expect(aiResponse.toLowerCase()).to.satisfy((text) => 
          text.includes('error') || text.includes('404') || text.includes('not found') || text.includes('exist')
        );
      });
    });
  });

  it('AI analyzes channel page content and creator info', () => {
    // Visit YouTube's official channel
    cy.visit('https://www.youtube.com/@YouTube');
    cy.wait(3000);
    
    // Get channel name and subscriber count
    cy.get('yt-formatted-string#text.ytd-channel-name').first().invoke('text').then((channelName) => {
      cy.get('yt-formatted-string#subscriber-count').first().invoke('text').then((subCount) => {
        cy.askGroq(
          `I'm on a YouTube channel page for "${channelName}" with ${subCount}. 
          Based on the subscriber count, would you consider this a small, medium, or large channel? 
          What does this subscriber count suggest about the channel's influence?
          Answer in 2-3 sentences.`
        ).then((aiResponse) => {
          cy.log("📊 Channel Analysis:", aiResponse);
          expect(aiResponse).to.not.be.empty;
        });
      });
    });
  });

  it('AI evaluates video engagement metrics', () => {
    cy.visit('https://www.youtube.com/watch?v=ScMzIvxBSi4');
    cy.wait(3000);
    
    // Get view count and likes (if visible)
    cy.get('yt-formatted-string.ytd-video-view-count-renderer').invoke('text').then((views) => {
      cy.title().then((title) => {
        cy.askGroq(
          `I'm watching a YouTube video titled "${title}" with ${views}. 
          Based on the view count, how would you rate this video's popularity (viral/popular/moderate/low)? 
          What factors typically contribute to videos getting this level of views?
          Answer in 3 sentences.`
        ).then((aiResponse) => {
          cy.log("📊 Engagement Analysis:", aiResponse);
          
          // AI should provide popularity assessment
          expect(aiResponse.toLowerCase()).to.satisfy((text) => 
            text.includes('viral') || text.includes('popular') || text.includes('moderate') || text.includes('view')
          );
        });
      });
    });
  });

  it('AI suggests improvements for search queries', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Search with a vague query
    const vagueQuery = 'how to code';
    cy.get('input[name="search_query"]').type(`${vagueQuery}{enter}`);
    cy.wait(3000);
    
    // Count results
    cy.get('ytd-video-renderer').its('length').then((resultCount) => {
      cy.askGroq(
        `I searched YouTube for "${vagueQuery}" and got ${resultCount} results on the first page. 
        This is a very broad search query. Suggest 3 more specific search queries that would help someone 
        learning to code find better targeted content. Format as a bullet list.`
      ).then((aiResponse) => {
        cy.log("🔍 Search Optimization:", aiResponse);
        
        // AI should provide specific suggestions
        expect(aiResponse).to.satisfy((text) => 
          text.includes('python') || text.includes('javascript') || text.includes('beginner') || 
          text.includes('tutorial') || text.includes('specific')
        );
      });
    });
  });

  it('AI analyzes playlist organization and learning path', () => {
    // Visit a Cypress tutorial playlist
    cy.visit('https://www.youtube.com/playlist?list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ');
    cy.wait(3000);
    
    // Get playlist title and video count
    cy.get('yt-formatted-string.ytd-playlist-header-renderer').first().invoke('text').then((playlistTitle) => {
      cy.get('ytd-playlist-video-renderer').its('length').then((videoCount) => {
        cy.askGroq(
          `I'm viewing a YouTube playlist titled "${playlistTitle}" with ${videoCount} videos. 
          Is this a good size for a tutorial playlist? Would you consider this comprehensive or focused? 
          What's the ideal playlist length for learning a new skill?
          Answer in 3 sentences.`
        ).then((aiResponse) => {
          cy.log("📚 Playlist Analysis:", aiResponse);
          expect(aiResponse).to.not.be.empty;
        });
      });
    });
  });

  it('AI detects UI/UX issues or improvements', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Check dark mode toggle
    cy.get('body').then(($body) => {
      const isDarkMode = $body.attr('dark') !== undefined || $body.hasClass('dark');
      
      cy.viewport(375, 667); // Mobile view
      cy.wait(1000);
      
      cy.askGroq(
        `I'm viewing YouTube on a mobile device (375x667 pixels). The page is in ${isDarkMode ? 'dark' : 'light'} mode. 
        What are the key UX considerations for video platforms on mobile devices? 
        Name 3 important features that should be easily accessible on mobile.`
      ).then((aiResponse) => {
        cy.log("📱 Mobile UX Analysis:", aiResponse);
        
        // AI should mention mobile UX elements
        expect(aiResponse.toLowerCase()).to.satisfy((text) => 
          text.includes('search') || text.includes('navigation') || text.includes('play') || 
          text.includes('thumb') || text.includes('gesture') || text.includes('responsive')
        );
      });
      
      // Reset viewport
      cy.viewport(1280, 720);
    });
  });
});